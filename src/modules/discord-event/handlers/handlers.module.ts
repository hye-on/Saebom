import { Module } from '@nestjs/common';
import { SlashCommandHandler } from './interaction/slash/slash.interaction.handler';
import { ProblemCommand } from './interaction/slash/implementations/daily-problem';
import { ProblemModule } from '../../domain/problem/problem.module';
import { GuildHandler } from './guild/guild.handler';
import { ChannelModule } from '../../domain/channel/channel.module';
import { CommandRegistry } from './interaction/slash/slash.command.registry';
import { ButtonHandler } from './interaction/button/button.handler';
import { DailyProblemAnswer } from './interaction/button/implementations/daily-problem.answer';

@Module({
  imports: [ProblemModule, ChannelModule],
  providers: [SlashCommandHandler, GuildHandler, ButtonHandler, ProblemCommand, DailyProblemAnswer, CommandRegistry],
  exports: [SlashCommandHandler, GuildHandler, ButtonHandler],
})
export class HandlerModule {}
