import { Module } from '@nestjs/common';
import { HandlerModule } from '../handlers/handlers.module';

import { InteractionListener } from './interaction.listener';
import { AppLoggerModule } from '../../../common/logger/logger.module';
import { GuildCreateListener } from './guild-create.listener';

@Module({
  imports: [HandlerModule, AppLoggerModule],
  providers: [InteractionListener, GuildCreateListener],
  exports: [InteractionListener, GuildCreateListener],
})
export class ListenersModule {}
