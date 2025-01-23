import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { CommandInteraction } from 'discord.js';

@Injectable()
export class DiscordEventLogger {
  constructor(private readonly logger: Logger) {}

  logCommand(interaction: CommandInteraction) {
    this.logger.log('Discord command received', {
      commandName: interaction.commandName,
      guildId: interaction.guildId,
      channelId: interaction.channelId,
      userId: interaction.user.id,
      timestamp: new Date().toISOString(),
      options: interaction.options.data,
    });
  }

  logCommandError(interaction: CommandInteraction, error: Error) {
    this.logger.error('Discord command failed', {
      type: interaction.type,
      commandName: interaction.commandName,
      guildId: interaction.guildId,
      userId: interaction.user.id,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
    });
  }
}
