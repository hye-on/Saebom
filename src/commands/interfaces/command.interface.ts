import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder; // 명령어 메타데이터
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
