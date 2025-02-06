import { EmbedBuilder } from 'discord.js';
import { ProblemMessageOptions } from '../types/daily-problem-message.type';

export const createProblemEmbed = ({ problem, timestamp }: ProblemMessageOptions): EmbedBuilder => {
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
    .setTimestamp(timestamp);
};
