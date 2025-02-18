import { Events, Guild } from 'discord.js';
import { EventListener } from '../core/decorators/event-listener.decorator';
import { IEventListener } from '../core/interfaces/event-listener.interface';
import { Injectable } from '@nestjs/common';
import { GuildSetupHandler } from '../handlers/guild-setup.handler';

@Injectable()
@EventListener({ event: Events.GuildCreate })
export class GuildCreateListener implements IEventListener<Guild> {
  constructor(private readonly guildSetupHandler: GuildSetupHandler) {}

  async handle(guild: Guild): Promise<void> {
    await this.guildSetupHandler.setup(guild);
  }
}
