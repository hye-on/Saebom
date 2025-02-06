import { Module } from '@nestjs/common';
import { CommandHandler } from './command.handler';
import { AppLoggerModule } from '../../../../common/logger/logger.module';
import { ProblemCommand } from './implementations/daily-problem';
import { ProblemModule } from '../../../domain/problem/problem.module';
import { GuildHandler } from '../guild/guild.handler';
import { ChannelModule } from '../../../domain/channel/channel.module';
import { CommandRegistry } from './command.registry';

@Module({
  imports: [AppLoggerModule, ProblemModule, ChannelModule],
  providers: [CommandHandler, GuildHandler, ProblemCommand, CommandRegistry],
  exports: [CommandHandler, GuildHandler],
})
export class CommandsModule {}
