import { SlashCommandBuilder, GuildMember, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.member || !(interaction.member instanceof GuildMember)) {
      await interaction.reply('Unable to fetch member information.');
      return;
    }

    const member = interaction.member;

    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt || 'an unknown date'}.`
    );
  },
};
