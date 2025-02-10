import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Collection } from 'discord.js';
import { SlashCommand } from './interfaces/slash.command.interface';
import * as fs from 'fs';
import * as path from 'path';

import { LoggerService } from '../../../../../common/logger/logger.service';
import { ProblemCommand } from './implementations/daily-problem';

@Injectable()
export class CommandRegistry implements OnModuleInit {
  private readonly commands = new Collection<string, SlashCommand>();

  constructor(private readonly moduleRef: ModuleRef, private readonly logger: LoggerService) {}

  async onModuleInit() {
    await this.loadCommands();
  }

  private async loadCommands(): Promise<void> {
    const problemCommand = this.moduleRef.get(ProblemCommand, { strict: false });
    this.commands.set(problemCommand.data.name, problemCommand);
    this.logger.log(`Command registered: ${problemCommand.data.name}`);

    const commandsPath = path.join(__dirname, '..', 'slash/implementations');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: SlashCommand = (await import(filePath)).default;

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

  getCommands(): Collection<string, SlashCommand> {
    return this.commands;
  }
}
