import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Problem } from '@src/database/entities';
import { DiscordGateway } from '@src/modules/discord/services/gateway/discord.gateway';
import { ChannelService } from '@src/modules/domain/channel/channel.service';

import { ProblemService } from '@src/modules/domain/problem/problem.service';
import { createProblemMessage } from '../utils/problem.message.util';
import { Channel } from '@src/database/entities/channel.entity';
import { ChannelType } from '@src/database/types';
import { LoggerService } from '@src/common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import {
  ChannelMessage,
  MessageBatchSenderService,
} from '@src/modules/discord/services/batch-sender/message-batch-sender.service';

type SendResult = {
  channelId: string;
  problemId: number;
  success: boolean;
  error?: Error;
};

@Injectable()
export class DailyProblemScheduler {
  constructor(
    private readonly problemService: ProblemService,
    private readonly discordGateway: DiscordGateway,
    private readonly channelService: ChannelService,
    private readonly logger: LoggerService,
    private readonly batchSender: MessageBatchSenderService
  ) {}

  @CatchError({ reply: true })
  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  async sendDailyProblem(): Promise<void> {
    const problem = await this.problemService.getTodayProblem();

    const channels = await this.channelService.getChannelsByType(ChannelType.CS);
    const results = await this.sendProblemToChannels(problem, channels);

    this.logResults(results);
  }

  private async sendProblemToChannels(problem: Problem, channels: Channel[]): Promise<SendResult[]> {
    const messagePayload = createProblemMessage({
      problem,
      timestamp: new Date(),
    });

    const channelMessages: ChannelMessage[] = channels.map(channel => ({
      channelId: channel.channelId,
      message: messagePayload,
    }));

    const batchResults = await this.batchSender.sendToChannels(channelMessages);

    return batchResults.map(result => ({
      channelId: result.channelId,
      problemId: problem.id,
      success: result.success,
      error: result.error,
    }));
  }

  private logResults(results: SendResult[]): void {
    const successResults = results.filter(result => result.success);
    const failedResults = results.filter(result => !result.success);

    if (successResults.length > 0) {
      this.logger.log('Daily problems sent successfully', {
        successCount: successResults.length,
        channels: successResults.map(r => r.channelId),
      });
    }

    failedResults.forEach(result => {
      this.logger.error('Failed to send daily problem to channel', result.error, {
        channelId: result.channelId,
        problemId: result.problemId,
      });
    });
  }
}
