import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';

import { InteractionListener } from './handlers/interaction.listener';
import { AppLoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [CommandsModule, AppLoggerModule],
  providers: [InteractionListener],
  exports: [InteractionListener],
})
export class ListenersModule {}
