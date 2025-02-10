import { Injectable } from '@nestjs/common';
import { Interaction } from 'discord.js';
import { SlashCommandHandler } from '../handlers/interaction/slash/slash.interaction.handler';
import { Listener } from './interfaces/listener.interface';
import { ButtonHandler } from '../handlers/interaction/button/button.handler';

@Injectable()
export class InteractionListener implements Listener<Interaction> {
  constructor(private readonly commandHandler: SlashCommandHandler, private readonly buttonHandler: ButtonHandler) {}

  async handle(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      await this.commandHandler.handleCommand(interaction);
    } else if (interaction.isButton()) {
      await this.buttonHandler.handleButtonInteraction(interaction);
    }
  }
}
