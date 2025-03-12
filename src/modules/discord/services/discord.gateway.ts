import { Injectable } from '@nestjs/common';
import { Client, EmbedBuilder, TextChannel } from 'discord.js';
import { LoggerService } from '../../../common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { AppException, ErrorMessage } from '@src/common/errors';
import { DiscordMessageRepository } from '@src/modules/domain/discord-message/discord-message.repository';
import { ChannelMessage } from '../types/channel-message';

@Injectable()
export class DiscordGateway {
  constructor(
    private readonly client: Client,
    private readonly logger: LoggerService,
    private readonly discordMessageRepository: DiscordMessageRepository
  ) {}

  @CatchError({ rethrow: true })
  async sendMessage(channelId: string, content: string): Promise<void> {
    const channel = await this.getChannel(channelId);
    await channel.send(content);
  }

  @CatchError({ rethrow: true })
  async sendEmbed(channelId: string, embed: EmbedBuilder): Promise<void> {
    const channel = await this.getChannel(channelId);
    const sentMessage = await channel.send({ embeds: [embed] });

    await this.discordMessageRepository.saveMessage({
      channelId: sentMessage.channelId,
      guildId: sentMessage.guildId,
      discordMessageId: sentMessage.id,
      content: { embeds: [embed.toJSON()] },
    });
  }

  @CatchError({ rethrow: true })
  async sendMessageWithComponents(channelMessage: ChannelMessage): Promise<void> {
    const { channelId, message, metadata } = channelMessage;

    const channel = await this.getChannel(channelId);
    const sentMessage = await channel.send(message);

    await this.discordMessageRepository.saveMessage({
      channelId: sentMessage.channelId,
      guildId: sentMessage.guildId,
      discordMessageId: sentMessage.id,
      content: message,
      metadata,
    });
  }

  private async getChannel(channelId: string): Promise<TextChannel> {
    const channel = await this.client.channels.fetch(channelId);

    if (!(channel instanceof TextChannel)) {
      throw new AppException(ErrorMessage.Invalid.CHANNEL_TYPE);
    }

    return channel;
  }
}
