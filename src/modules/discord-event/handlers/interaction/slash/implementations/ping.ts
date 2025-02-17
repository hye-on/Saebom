import { AppException, ErrorMessage } from '@src/common/errors';
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    throw new AppException(ErrorMessage.Invalid.CHANNEL_TYPE);
    await interaction.reply('Pong!');
  },
};
