import { Injectable } from '@nestjs/common';
import { Command } from '../core/decorators/command.decorator';
import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';

@Injectable()
@Command({
  name: 'user',
  description: 'Provides information about the user.',
})
export class UserCommand {
  constructor(private readonly logger: LoggerService) {}

  getData() {
    return new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.');
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    if (!interaction.member || !(interaction.member instanceof GuildMember)) {
      await interaction.reply('Unable to fetch member information.');
      return;
    }

    const member = interaction.member;
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${member.joinedAt || 'an unknown date'}.`
    );

    this.logger.debug('User command executed', {
      userId: interaction.user.id,
    });
  }
}
