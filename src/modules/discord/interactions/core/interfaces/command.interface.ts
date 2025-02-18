import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface ICommand {
  getData(): Partial<SlashCommandBuilder>;
  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
