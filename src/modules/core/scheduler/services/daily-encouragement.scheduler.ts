import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordGateway } from '@src/modules/discord/services/discord.gateway';
import { ChannelService } from '@src/modules/domain/channel/channel.service';
import { Channel } from '@src/database/entities/channel.entity';
import { ChannelType } from '@src/database/types';
import { LoggerService } from '@src/common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { MessageBatchSenderService } from '@src/modules/discord/services/message-batch-sender.service';
import { DiscordMessageType } from '@src/modules/domain/discord-message/discord-message.type';
import { ChannelMessage } from '@src/modules/discord/types/channel-message';
import { MotivationMessageService } from '@src/modules/domain/motivation-message/motivatioin-message.service';

type SendResult = {
  channelId: string;
  messageId: string;
  success: boolean;
  error?: Error;
};

@Injectable()
export class DailyEncouragementScheduler {
  constructor(
    private readonly motivationMessageService: MotivationMessageService,
    private readonly discordGateway: DiscordGateway,
    private readonly channelService: ChannelService,
    private readonly logger: LoggerService,
    private readonly batchSender: MessageBatchSenderService
  ) {}

  @CatchError()
  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async sendDailyEncouragement(): Promise<void> {
    const encouragementMessage = await this.motivationMessageService.getTodayEncouragement();
    const channels = await this.fetchTargetChannels();
    const results = await this.sendEncouragementToChannels(encouragementMessage, channels);

    this.logSendResults(results);
  }

  private async fetchTargetChannels(): Promise<Channel[]> {
    return this.channelService.getChannelsByType(ChannelType.CHAT);
  }

  private async sendEncouragementToChannels(message: string, channels: Channel[]): Promise<SendResult[]> {
    const channelMessages: ChannelMessage[] = channels.map(channel => ({
      channelId: channel.channelId,
      message: message,
      metadata: {
        type: DiscordMessageType.ENCOURAGEMENT,
      },
    }));

    const batchResults = await this.batchSender.sendToChannels(channelMessages);

    return batchResults.map(result => ({
      channelId: result.channelId,
      messageId: 'encouragement',
      success: result.success,
      error: result.error,
    }));
  }

  private logSendResults(results: SendResult[]): void {
    const successResults = results.filter(result => result.success);
    const failedResults = results.filter(result => !result.success);

    if (successResults.length > 0) {
      this.logger.log('Daily encouragement messages sent successfully', {
        successCount: successResults.length,
        channels: successResults.map(r => r.channelId),
      });
    }

    failedResults.forEach(result => {
      this.logger.error('Failed to send daily encouragement message to channel', result.error, {
        channelId: result.channelId,
        messageId: result.messageId,
      });
    });
  }
}
