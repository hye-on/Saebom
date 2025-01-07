import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    try {
      await interaction.reply('Pong!');
    } catch (error) {
      console.error('Failed to execute the ping command:', error);
      await interaction.reply({
        content: 'There was an error executing the ping command.',
        ephemeral: true,
      });
    }
  },
};
