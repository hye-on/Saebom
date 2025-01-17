import { Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/command.interface';
import * as fs from 'fs';
import * as path from 'path';
import { DiscordEventLogger } from '../../common/logger/discord.event.logger';
import { LoggerService } from '../../common/logger/logger.service';
@Injectable()
export class CommandHandler implements OnModuleInit {
  private commands = new Collection<string, Command>();
  constructor(private readonly discordLogger: DiscordEventLogger, private readonly logger: LoggerService) {}

  async onModuleInit() {
    await this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const commandsPath = path.join(__dirname, '..', 'implementations');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: Command = (await import(filePath)).default;

      if (command && command.data && command.execute) {
        this.commands.set(command.data.name, command);
        this.logger.log('Command loaded', {
          commandName: command.data.name,
          filePath,
        });
      } else {
        this.logger.warn('Invalid command structure', {
          filePath,
          reason: 'Missing data or execute property',
        });
      }
    }
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

  getCommands(): Collection<string, Command> {
    return this.commands;
  }
}
