import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ListenersModule } from '../listeners/listeners.modules';
import { CommandsModule } from '../commands/commands.module';

@Module({
  imports: [ListenersModule, CommandsModule],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
