import { ButtonInteraction } from 'discord.js';

export interface ButtonCommand {
  execute(interaction: ButtonInteraction): Promise<void>;
}
