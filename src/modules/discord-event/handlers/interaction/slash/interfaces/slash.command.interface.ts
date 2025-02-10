import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface SlashCommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
