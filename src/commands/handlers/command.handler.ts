import { Injectable, OnModuleInit } from '@nestjs/common';
import { Collection, CommandInteraction } from 'discord.js';
import { Command } from '../interfaces/command.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CommandHandler implements OnModuleInit {
  private commands = new Collection<string, Command>();

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
        console.log(`Loaded command: ${command.data.name}`);
      } else {
        console.warn(`[WARNING] The command at ${filePath} is missing "data" or "execute" property.`);
      }
    }
  }

  async handleCommand(interaction: CommandInteraction) {
    const command = this.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      if (interaction.isChatInputCommand()) await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error executing this command!',
        ephemeral: true,
      });
    }
  }

  getCommands(): Collection<string, Command> {
    console.log(this.commands.size);
    return this.commands;
  }
}
