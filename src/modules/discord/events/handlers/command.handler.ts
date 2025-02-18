import { Injectable } from '@nestjs/common';
import { CommandInteraction, ChatInputCommandInteraction } from 'discord.js';
import { InteractionDiscovery } from '../../interactions/core/discovery/interaction.discovery';
import { LoggerService } from '@src/common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class CommandHandler {
  constructor(private readonly discoveryService: InteractionDiscovery, private readonly logger: LoggerService) {}

  @CatchError({ reply: true })
  async handle(interaction: CommandInteraction): Promise<void> {
    if (!interaction.isChatInputCommand()) {
      this.logger.warn('Invalid command type received', {
        type: interaction.type,
        commandName: interaction.commandName,
        userId: interaction.user.id,
        guildId: interaction.guildId,
      });
      return;
    }

    const command = this.discoveryService.getCommands().get(interaction.commandName);
    if (!command) {
      await this.handleUnknownCommand(interaction);
      return;
    }

    this.logger.debug('Executing command', {
      commandName: interaction.commandName,
      userId: interaction.user.id,
      guildId: interaction.guildId,
      options: interaction.options.data,
    });

    await command.execute(interaction);

    this.logger.log('Command executed successfully', {
      commandName: interaction.commandName,
      userId: interaction.user.id,
      guildId: interaction.guildId,
      executionTime: Date.now() - interaction.createdTimestamp,
    });
  }

  private async handleUnknownCommand(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({
      content: '알 수 없는 명령어입니다.',
      ephemeral: true,
    });
    this.logger.warn('Unknown command attempted', {
      commandName: interaction.commandName,
      userId: interaction.user.id,
      guildId: interaction.guildId,
    });
  }
}
