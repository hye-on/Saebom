import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { InteractionDiscovery } from './core/discovery/interaction.discovery.js';
import { ProblemCommand } from './commands/problem.command.js';
import { PingCommand } from './commands/ping.command.js';
import { ProblemModule } from '@src/modules/domain/problem/problem.module';
import { UserCommand } from './commands/user.command.js';
import { DailyProblemAnswer } from './button/DailyProblemAnswer.js';

@Module({
  imports: [DiscoveryModule, ProblemModule],
  providers: [InteractionDiscovery, ProblemCommand, PingCommand, UserCommand, DailyProblemAnswer],
  exports: [InteractionDiscovery],
})
export class InteractionsModule {}
