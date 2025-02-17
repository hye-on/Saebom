import { Module } from '@nestjs/common';
import { HandlerModule } from '../handlers/handlers.module';

import { InteractionListener } from './interaction.listener';
import { GuildCreateListener } from './guild-create.listener';

@Module({
  imports: [HandlerModule],
  providers: [InteractionListener, GuildCreateListener],
  exports: [InteractionListener, GuildCreateListener],
})
export class ListenersModule {}
