import { Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, CommandInteraction } from 'discord.js';
import { SlashCommand } from './interfaces/slash.command.interface';

import { DiscordEventLogger } from '../../../../../common/logger/discord.event.logger';
import { CommandRegistry } from './slash.command.registry';
@Injectable()
export class SlashCommandHandler implements OnModuleInit {
  private commands = new Collection<string, SlashCommand>();
  constructor(private readonly discordLogger: DiscordEventLogger, private readonly commandRegistry: CommandRegistry) {}

  async onModuleInit() {
    this.commands = this.commandRegistry.getCommands();
  }
  async handleCommand(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);

    if (!command) {
      this.discordLogger.logCommandError(interaction, new Error(`No command matching ${interaction.commandName}`));
      return;
    }

    try {
      if (interaction.isChatInputCommand()) {
        await command.execute(interaction);
        this.discordLogger.logCommand(interaction);
      }
    } catch (error) {
      this.discordLogger.logCommandError(interaction, error instanceof Error ? error : new Error('Unknown error'));
      await interaction.reply({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    }
  }
}
