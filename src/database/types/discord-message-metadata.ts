import { DiscordMessageType } from '@src/modules/domain/discord-message/discord-message.type';

export type ProblemMetadata = {
  type: DiscordMessageType.PROBLEM;
  problemId: number;
};
export type EncouragementMetadata = {
  type: DiscordMessageType.ENCOURAGEMENT;
};
export type DiscordMessageMetadata = ProblemMetadata | EncouragementMetadata;
