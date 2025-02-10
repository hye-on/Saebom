import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { ProblemService } from '../../../../../domain/problem/problem.service';
import { LoggerService } from '@src/common/logger/logger.service';
import { EmbedBuilder } from 'discord.js';

@Injectable()
export class ProblemCommand {
  data = new SlashCommandBuilder().setName('problem').setDescription("Get today's CS problem");

  constructor(private readonly problemService: ProblemService, private readonly logger: LoggerService) {}

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const userId = interaction.user.id;

    try {
      const problem = await this.problemService.getTodayProblem();

      const embed = new EmbedBuilder()
        .setTitle('📭 오늘의 CS 문제')
        .setDescription(problem.content)
        .setColor(0x00ff00)
        .addFields([
          {
            name: '난이도',
            value: problem.difficultyLevel,
            inline: true,
          },
          {
            name: '카테고리',
            value: problem.category,
            inline: true,
          },
          {
            name: '키워드',
            value: problem.keywords.join(', ') || '없음',
            inline: true,
          },
        ])
        .setFooter({ text: `문제 ID: ${problem.id}` })
        .setTimestamp(new Date());

      await interaction.reply({ embeds: [embed] });

      this.logger.log('✅ Problem command executed successfully', {
        userId,
        problemId: problem.id,
        command: 'problem',
      });
    } catch (error) {
      this.logger.error(
        '❌ Problem command execution failed',
        error instanceof Error ? error : new Error('Unknown error'),
        {
          userId,
          command: 'problem',
        }
      );

      await interaction.reply({
        content: '문제를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
        ephemeral: true,
      });
    }
  }
}
