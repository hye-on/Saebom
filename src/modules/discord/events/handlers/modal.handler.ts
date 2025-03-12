import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { ModalSubmitInteraction } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';
import { MODAL_HANDLER_METADATA } from '@src/modules/discord/interactions/core/decorators/modal.decorator';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class ModalHandler implements OnModuleInit {
  private readonly handlers = new Map<string, (interaction: ModalSubmitInteraction) => Promise<void>>();

  constructor(
    private readonly logger: LoggerService,
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector
  ) {}

  async onModuleInit(): Promise<void> {
    this.discoverHandlers();
  }

  private discoverHandlers(): void {
    const providers = this.discoveryService.getProviders();

    providers
      .filter(provider => provider.instance)
      .forEach(provider => {
        const customId = this.reflector.get<string>(MODAL_HANDLER_METADATA, provider.instance.constructor);
        if (customId && typeof provider.instance.execute === 'function') {
          if (this.handlers.has(customId)) {
            this.logger.warn(`Duplicate modal handler registration for: ${customId}. Overwriting existing handler.`);
          }
          this.handlers.set(customId, provider.instance.execute.bind(provider.instance));
          this.logger.debug(`Auto-registered modal handler: ${customId}`);
        }
      });
  }

  @CatchError({ reply: true })
  async handle(interaction: ModalSubmitInteraction): Promise<void> {
    const [handlerId] = interaction.customId.split(':');
    const handler = this.handlers.get(handlerId);

    if (!handler) {
      await this.handleUnknownModal(interaction);
      return;
    }

    this.logger.debug(`Processing modal interaction: ${interaction.customId}`);
    await handler(interaction);
  }

  private async handleUnknownModal(interaction: ModalSubmitInteraction): Promise<void> {
    await interaction.reply({ content: '알 수 없는 모달 동작입니다.', ephemeral: true });
    this.logger.warn(`Unknown modal interaction: ${interaction.customId}`);
  }
}
