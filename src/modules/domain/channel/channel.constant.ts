import { ChannelType } from '@src/database/types/channel.type';

interface ChannelConfig {
  name: string;
  emoji: string;
  type: ChannelType;
  description: string;
}

export const CHANNELS: ChannelConfig[] = [
  {
    name: 'cs문제',
    emoji: '📭',
    type: ChannelType.CS,
    description: 'CS 문제가 매일 오전 11시 30분에 공유됩니다',
  },
  {
    name: '에빙하우스의-망각곡선-복습',
    emoji: '📈',
    type: ChannelType.REVIEW,
    description: '복습 문제가 전송됩니다.',
  },
  {
    name: '새봄이',
    emoji: '🌸 ',
    type: ChannelType.CHAT,
    description: '새봄이와의 대화창입니다. 새봄이가 무슨말을 하는지 잘 들어보세요!',
  },
];
