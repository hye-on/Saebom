import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { ProblemMessageOptions } from '../types/daily-problem-message.type';

export const createProblemMessage = ({ problem, timestamp }: ProblemMessageOptions) => {
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
        name: '문제 유형',
        value: problem.type,
        inline: true,
      },
    ]);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setCustomId('problem_answer').setLabel('답변하기').setStyle(ButtonStyle.Primary)
  );

  return { embeds: [embed], components: [row] };
};
