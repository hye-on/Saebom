import { Injectable } from '@nestjs/common';
import { Command } from '../core/decorators/command.decorator';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';

@Injectable()
@Command({
  name: 'ping',
  description: 'Check bot latency',
})
export class PingCommand {
  constructor(private readonly logger: LoggerService) {}

  getData() {
    return new SlashCommandBuilder().setName('ping').setDescription('Check bot latency');
  }

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const sent = await interaction.reply({
      content: 'Pinging...',
      fetchReply: true,
    });

    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    this.logger.debug('Ping command executed', {
      userId: interaction.user.id,
      latency,
      wsLatency: interaction.client.ws.ping,
    });
  }
}
