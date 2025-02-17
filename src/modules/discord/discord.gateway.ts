import { Injectable } from '@nestjs/common';
import { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, TextChannel } from 'discord.js';
import { LoggerService } from '../../common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { AppException, ErrorMessage } from '@src/common/errors';

@Injectable()
export class DiscordGateway {
  constructor(private readonly client: Client, private readonly logger: LoggerService) {}

  @CatchError({ rethrow: true })
  async sendMessage(channelId: string, content: string): Promise<void> {
    const channel = await this.getChannel(channelId);
    await channel.send(content);
  }

  @CatchError({ rethrow: true })
  async sendEmbed(channelId: string, embed: EmbedBuilder): Promise<void> {
    const channel = await this.getChannel(channelId);
    await channel.send({ embeds: [embed] });
  }

  @CatchError({ rethrow: true })
  async sendMessageWithComponents(
    channelId: string,
    options: { embeds: EmbedBuilder[]; components: ActionRowBuilder<ButtonBuilder>[] }
  ): Promise<void> {
    const channel = await this.getChannel(channelId);
    await channel.send(options);
  }

  private async getChannel(channelId: string): Promise<TextChannel> {
    const channel = await this.client.channels.fetch(channelId);

    if (!(channel instanceof TextChannel)) {
      throw new AppException(ErrorMessage.Invalid.CHANNEL_TYPE);
    }

    return channel;
  }
}
