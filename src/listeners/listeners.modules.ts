import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';
import { ReadyListener } from './handlers/ready.listener';
import { InteractionListener } from './handlers/interaction.listener';

@Module({
  imports: [CommandsModule],
  providers: [ReadyListener, InteractionListener],
  exports: [ReadyListener, InteractionListener],
})
export class ListenersModule {}
