import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ListenersModule } from '../listeners/listeners.modules';
import { CommandsModule } from '../commands/commands.module';
import { AppLoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [ListenersModule, CommandsModule, AppLoggerModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
