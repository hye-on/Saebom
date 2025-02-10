import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Problem } from '@src/database/entities';
import { DiscordGateway } from '@src/modules/discord/discord.gateway';
import { ChannelService } from '@src/modules/domain/channel/channel.service';

import { ProblemService } from '@src/modules/domain/problem/problem.service';
import { createProblemMessage } from '../utils/problem.message.util';
import { Channel } from '@src/database/entities/channel.entity';
import { ChannelType } from '@src/database/types';
import { LoggerService } from '@src/common/logger/logger.service';

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
    private readonly logger: LoggerService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_11AM)
  async sendDailyProblem(): Promise<void> {
    try {
      const problem = await this.problemService.getTodayProblem();

      const channels = await this.channelService.getChannelsByType(ChannelType.CS);
      const results = await this.sendProblemToChannels(problem, channels);

      this.logResults(results);
    } catch (error) {
      this.logger.error('Daily problem scheduling failed', error as Error);
      throw error;
    }
  }

  private async sendProblemToChannels(problem: Problem, channels: Channel[]): Promise<SendResult[]> {
    const message = createProblemMessage({
      problem,
      timestamp: new Date(),
    });

    return Promise.all(
      channels.map(async (channel): Promise<SendResult> => {
        try {
          await this.discordGateway.sendMessageWithComponents(channel.channelId, message);
          return {
            channelId: channel.channelId,
            problemId: problem.id,
            success: true,
          };
        } catch (error) {
          return {
            channelId: channel.channelId,
            problemId: problem.id,
            success: false,
            error: error as Error,
          };
        }
      })
    );
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
