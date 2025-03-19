import { Module } from '@nestjs/common';

import { ProblemModule } from '@src/modules/domain/problem/problem.module';
import { ChannelModule } from '@src/modules/domain/channel/channel.module';
import { DiscordModule } from '@src/modules/discord/discord.module';
import { DailyProblemScheduler } from './services/daily-problem.scheduler';
import { UserRepository } from '@src/modules/domain/user/user.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReviewSchedule, User } from '@src/database/entities';
import { ReviewScheduler } from './services/review.scheduler';
import { ReviewService } from '@src/modules/domain/review/review.service';
import { ReviewScheduleRepository } from '@src/modules/domain/review/review.repository';

@Module({
  imports: [ProblemModule, ChannelModule, DiscordModule, MikroOrmModule.forFeature([User, ReviewSchedule])],
  providers: [DailyProblemScheduler, UserRepository, ReviewScheduler, ReviewService, ReviewScheduleRepository],
})
export class SchedulerModule {}
