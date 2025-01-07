import { SlashCommandBuilder, Guild, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder().setName('server').setDescription('Provides information about the server.'),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    // interaction.guild가 유효한지 확인
    if (!interaction.inGuild) {
      await interaction.reply('This command can only be used within a server.');
      return;
    }

    const guild: Guild = interaction.guild;

    await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members.`);
  },
};
