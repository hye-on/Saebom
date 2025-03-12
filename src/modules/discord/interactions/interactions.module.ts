import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ProblemModule } from '@src/modules/domain/problem/problem.module';
import { InteractionDiscovery } from './core/discovery/interaction.discovery';
import { ProblemCommand } from './commands/problem.command';
import { PingCommand } from './commands/ping.command';
import { UserCommand } from './commands/user.command';
import { DailyProblemAnswer } from './button/daily-problem.answer';
import { ProblemAnswerProcessor } from './modals/problem-answer.processor';
import { GradingModule } from '@src/modules/core/grading/grading.module';
import { UserRepository } from '@src/modules/domain/user/user.repository';
import { DiscordMessageRepository } from '@src/modules/domain/discord-message/discord-message.repository';
import { DiscordMessage, User } from '@src/database/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [DiscoveryModule, ProblemModule, GradingModule, MikroOrmModule.forFeature([DiscordMessage, User])],
  providers: [
    InteractionDiscovery,
    ProblemCommand,
    PingCommand,
    UserCommand,
    DailyProblemAnswer,
    ProblemAnswerProcessor,
    DiscordMessageRepository,
    UserRepository,
  ],
  exports: [InteractionDiscovery],
})
export class InteractionsModule {}
