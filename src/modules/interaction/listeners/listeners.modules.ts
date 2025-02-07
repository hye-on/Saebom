import { Module } from '@nestjs/common';
import { CommandsModule } from '../handlers/commands/commands.module';

import { SlashInteractionListener } from './slash.interaction.listener';
import { AppLoggerModule } from '../../../common/logger/logger.module';
import { GuildCreateListener } from './guild-create.listener';

@Module({
  imports: [CommandsModule, AppLoggerModule],
  providers: [SlashInteractionListener, GuildCreateListener],
  exports: [SlashInteractionListener, GuildCreateListener],
})
export class ListenersModule {}
