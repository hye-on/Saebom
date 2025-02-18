import { Injectable } from '@nestjs/common';
import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../core/decorators/command.decorator';
import { ProblemService } from '@src/modules/domain/problem/problem.service';
import { LoggerService } from '@src/common/logger/logger.service';
import { Problem } from '@src/database/entities';

@Injectable()
@Command({
  name: 'problem',
  description: "Get today's CS problem",
})
export class ProblemCommand {
  constructor(private readonly problemService: ProblemService, private readonly logger: LoggerService) {}

  getData() {
    return new SlashCommandBuilder().setName('problem').setDescription("Get today's CS problem");
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const userId = interaction.user.id;

    this.logger.debug('Fetching problem', {
      userId,
      guildId: interaction.guildId,
    });

    const problem = await this.problemService.getTodayProblem();

    const embed = this.createProblemEmbed(problem);
    await interaction.reply({ embeds: [embed] });

    this.logger.log('Problem command executed successfully', {
      userId,
      problemId: problem.id,
      guildId: interaction.guildId,
    });
  }

  private createProblemEmbed(problem: Problem) {
    return new EmbedBuilder()
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
      .setTimestamp();
  }
}
