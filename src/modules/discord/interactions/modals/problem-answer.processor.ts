import { Injectable } from '@nestjs/common';
import { ModalSubmitInteraction, EmbedBuilder } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';
import { Modal } from '../core/decorators/modal.decorator';
import { ProblemType, ProblemAnswer, UserAnswer, AnswerDetails } from '@src/database/types';
import { GradingService } from '@src/modules/core/grading/grading.service';
import { ProblemService } from '@src/modules/domain/problem/problem.service';
import { DiscordMessageRepository } from '@src/modules/domain/discord-message/discord-message.repository';
import { DiscordMessageType } from '@src/modules/domain/discord-message/discord-message.type';
import { UserRepository } from '@src/modules/domain/user/user.repository';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { ReviewService } from '@src/modules/domain/review/review.service';

@Injectable()
@Modal('answer_modal')
export class ProblemAnswerProcessor {
  constructor(
    private readonly logger: LoggerService,
    private readonly gradingService: GradingService,
    private readonly problemService: ProblemService,
    private readonly reviewService: ReviewService,
    private readonly discordMessageRepository: DiscordMessageRepository,
    private readonly userRepository: UserRepository
  ) {}

  @CatchError({ reply: true })
  async execute(interaction: ModalSubmitInteraction): Promise<void> {
    const messageId = interaction.message?.id;
    if (!messageId) {
      throw new Error('메시지 정보를 찾을 수 없습니다.');
    }

    const discordMessage = await this.discordMessageRepository.findByDiscordMessageId(messageId);
    if (!discordMessage || !discordMessage.metadata || discordMessage.metadata.type !== DiscordMessageType.PROBLEM) {
      throw new Error('문제 정보를 찾을 수 없습니다.');
    }

    const problemId = discordMessage.metadata.problemId;
    const problem = await this.problemService.getProblemById(problemId);
    if (!problem || !problem.answer) {
      throw new Error('⚠️ 문제 또는 정답 정보를 찾을 수 없습니다.');
    }

    const userId = await this.userRepository.findIdByDiscordUserId(interaction.user.id);
    const problemType = problem.type;
    const userAnswer = this.extractUserAnswer(interaction, problemType);
    const result = await this.gradingService.grade(problemType, problem.answer, userAnswer);

    await this.sendGradingResponse(interaction, problemType, result, problem.answer, userAnswer);
    // 답변 이력 저장
    await this.problemService.saveUserAnswer({
      userId,
      problemId,
      userAnswer,
      result,
      isCorrect: this.isCorrect(result, problem),
      solvedAt: new Date(),
    });
    await this.reviewService.createReviewSchedule({ userId, problemId });
  }

  private extractUserAnswer(interaction: ModalSubmitInteraction, problemType: ProblemType): UserAnswer {
    if (problemType === ProblemType.BLANK) {
      // 빈칸형 문제 답변 추출
      const blanks = interaction.fields.components.flatMap(row =>
        row.components
          .filter(component => component.customId.startsWith('blank_'))
          .map(component => interaction.fields.getTextInputValue(component.customId))
      );
      return { blanks };
    } else if (problemType === ProblemType.DESCRIPTIVE) {
      return { text: interaction.fields.getTextInputValue('answer') };
    }
    throw new Error(`지원되지 않는 문제 유형: ${problemType}`);
  }

  private async sendGradingResponse(
    interaction: ModalSubmitInteraction,
    problemType: ProblemType,
    result: AnswerDetails,
    problemAnswer: ProblemAnswer,
    userAnswer: UserAnswer
  ): Promise<void> {
    const embed = new EmbedBuilder()
      .setTitle('📝 채점 결과')
      .setColor(this.isCorrect(result, { answer: problemAnswer, type: problemType }) ? '#00FF00' : '#FF0000')
      .setTimestamp()
      .setFooter({ text: `${interaction.user.username}의 답변` });

    if (problemType === ProblemType.BLANK && 'results' in result) {
      const total = result.results.length;
      const correctCount = result.results.filter(r => r.isCorrect).length;
      embed
        .setDescription(
          result.allCorrect ? '✅ 모든 빈칸이 정답입니다!' : `❌ ${total - correctCount}개의 빈칸이 틀렸습니다.`
        )
        .addFields(
          {
            name: '정답률',
            value: `${correctCount}/${total} (${Math.round((correctCount / total) * 100)}%)`,
            inline: true,
          },
          {
            name: '정답 예시',
            value: problemAnswer.exampleAnswer,
            inline: true,
          }
        );

      result.results.forEach((res, idx) =>
        embed.addFields({
          name: `빈칸 ${idx + 1}`,
          value: `${res.isCorrect ? '✅' : '❌'} 입력: "${res.userInput}"`,
          inline: false,
        })
      );
    } else if (problemType === ProblemType.DESCRIPTIVE && 'similarityScore' in result && 'text' in userAnswer) {
      const { similarityScore, matchedKeyPoints, missedKeyPoints, feedback } = result;
      embed.setDescription(`유사도 점수: ${(similarityScore * 100).toFixed(1)}%`).addFields(
        {
          name: '✅ 맞춘 키포인트',
          value: matchedKeyPoints.length > 0 ? matchedKeyPoints.join(', ') : '없음',
          inline: false,
        },
        {
          name: '❌ 놓친 키포인트',
          value: missedKeyPoints.length > 0 ? missedKeyPoints.join(', ') : '없음',
          inline: false,
        },
        {
          name: '🎯 예시 정답',
          value: `\`\`\`${problemAnswer.exampleAnswer || '예시 정답 없음'}\`\`\``,
          inline: false,
        },
        {
          name: '📝 내 답변',
          value: `\`\`\`${userAnswer.text || '제출된 답변 없음'}\`\`\``,
          inline: false,
        },
        {
          name: '💬 피드백',
          value: feedback || '피드백이 없습니다.',
          inline: false,
        }
      );
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }

  private isCorrect(result: AnswerDetails, problem: { answer: ProblemAnswer; type: ProblemType }): boolean {
    if ('allCorrect' in result) {
      return result.allCorrect;
    } else if ('similarityScore' in result) {
      const threshold =
        problem.type === ProblemType.DESCRIPTIVE ? (problem.answer as any).similarityThreshold || 0.7 : 0.7;
      return result.similarityScore >= threshold;
    }
    return false;
  }
}
