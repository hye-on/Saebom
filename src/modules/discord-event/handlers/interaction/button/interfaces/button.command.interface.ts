import { ButtonInteraction } from 'discord.js';

export interface ButtonCommand {
  customId: string;
  execute(interaction: ButtonInteraction): Promise<void>;
}
