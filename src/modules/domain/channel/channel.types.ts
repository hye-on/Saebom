import { ChannelType } from '@src/database/types';

export type ChannelInfo = {
  id: number;
  guildId: string;
  channelId: string;
  type: ChannelType;
};
