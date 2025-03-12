import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { EventListenerDiscovery } from './core/discovery/event-listener.discovery';
import { InteractionListener } from './listeners/interaction.listener';
import { GuildSetupHandler } from './handlers/guild-setup.handler';
import { CommandHandler } from './handlers/command.handler';
import { ButtonHandler } from './handlers/button.handler';
import { GuildCreateListener } from './listeners/guild-create.listener';
import { InteractionDiscovery } from '../interactions/core/discovery/interaction.discovery';
import { ChannelModule } from '@src/modules/domain/channel/channel.module';
import { ModalHandler } from './handlers/modal.handler';
import { UserModule } from '@src/modules/domain/user/user.module';

@Module({
  imports: [DiscoveryModule, ChannelModule, UserModule],
  providers: [
    EventListenerDiscovery,
    InteractionListener,
    GuildCreateListener,
    GuildSetupHandler,
    CommandHandler,
    ButtonHandler,
    ModalHandler,
    InteractionDiscovery,
  ],
  exports: [EventListenerDiscovery],
})
export class EventsModule {}
