import { Injectable } from '@nestjs/common';
import { Interaction } from 'discord.js';
import { Events } from 'discord.js';
import { EventListener } from '../core/decorators/event-listener.decorator';
import { IEventListener } from '../core/interfaces/event-listener.interface';
import { CommandHandler } from '../handlers/command.handler';
import { ButtonHandler } from '../handlers/button.handler';
import { ModalHandler } from '../handlers/modal.handler';

@Injectable()
@EventListener({ event: Events.InteractionCreate })
export class InteractionListener implements IEventListener<Interaction> {
  constructor(
    private readonly commandHandler: CommandHandler,
    private readonly buttonHandler: ButtonHandler,
    private readonly modalHandler: ModalHandler
  ) {}

  async handle(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) {
      await this.commandHandler.handle(interaction);
    } else if (interaction.isButton()) {
      await this.buttonHandler.handle(interaction);
    } else if (interaction.isModalSubmit()) {
      await this.modalHandler.handle(interaction);
      return;
    }
  }
}
