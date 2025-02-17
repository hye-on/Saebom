import { Module } from '@nestjs/common';

import { ProblemModule } from '@src/modules/domain/problem/problem.module';
import { ChannelModule } from '@src/modules/domain/channel/channel.module';
import { DiscordModule } from '@src/modules/discord/discord.module';
import { DailyProblemScheduler } from './services/daily-problem.scheduler';

@Module({
  imports: [ProblemModule, ChannelModule, DiscordModule],
  providers: [DailyProblemScheduler],
})
export class SchedulerModule {}
