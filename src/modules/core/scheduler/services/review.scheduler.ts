import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReviewService } from '@src/modules/domain/review/review.service';
import { LoggerService } from '@src/common/logger/logger.service';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { UserRepository } from '@src/modules/domain/user/user.repository';
import { ChannelService } from '@src/modules/domain/channel/channel.service';

@Injectable()
export class ReviewScheduler {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly channelService: ChannelService
  ) {}

  @CatchError()
  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async processDailyReviews(): Promise<void> {
    const activeUsers = await this.userRepository.findAllActiveUsers();
    const todayReviews = await this.reviewService.getTodayReviewsWithProblems(activeUsers);
    const guildIds = todayReviews.map(review => review.guildId);
    const channels = await this.channelService.getReviewChannels(guildIds);
    // TODO: 메시지 만들고 디스코드 전송 로직
  }
}
