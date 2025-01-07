import { Injectable } from '@nestjs/common';
import { Interaction } from 'discord.js';
import { CommandHandler } from '../../commands/handlers/command.handler';
import { Listener } from '../interfaces/listener.interface';

@Injectable()
export class InteractionListener implements Listener<Interaction> {
  constructor(private readonly commandHandler: CommandHandler) {}

  async handle(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    await this.commandHandler.handleCommand(interaction);
  }
}
