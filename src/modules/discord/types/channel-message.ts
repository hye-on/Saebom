import { DiscordMessageMetadata } from '@src/database/types/discord-message-metadata';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';

export interface ChannelMessage {
  channelId: string;
  message:
    | string
    | {
        embeds: EmbedBuilder[];
        components: ActionRowBuilder<ButtonBuilder>[];
      };
  metadata?: DiscordMessageMetadata;
}
