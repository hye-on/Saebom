import { Injectable } from '@nestjs/common';
import { Client, TextChannel, EmbedBuilder } from 'discord.js';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class DiscordGateway {
  constructor(private readonly client: Client, private readonly logger: LoggerService) {}

  async sendMessage(channelId: string, content: string): Promise<void> {
    try {
      const channel = await this.getChannel(channelId);
      await channel.send(content);
    } catch (error) {
      this.logger.error('Failed to send message', error as Error, {
        channelId,
      });
      throw new Error('Failed to send message');
    }
  }

  async sendEmbed(channelId: string, embed: EmbedBuilder): Promise<void> {
    try {
      const channel = await this.getChannel(channelId);
      await channel.send({ embeds: [embed] });
    } catch (error) {
      this.logger.error('Failed to send embed', error as Error, {
        channelId,
      });
      throw new Error('Failed to send embed');
    }
  }

  private async getChannel(channelId: string): Promise<TextChannel> {
    const channel = await this.client.channels.fetch(channelId);

    if (!channel || !(channel instanceof TextChannel)) {
      throw new Error(`Channel ${channelId} not found or is not a text channel`);
    }

    return channel;
  }
}
