import { Injectable } from '@nestjs/common';
import { Guild } from 'discord.js';
import { Listener } from './interfaces/listener.interface';

import { GuildHandler } from '@src/modules/discord-event/handlers/guild/guild.handler';

@Injectable()
export class GuildCreateListener implements Listener<Guild> {
  constructor(private readonly guildHandler: GuildHandler) {}

  async handle(guild: Guild): Promise<void> {
    await this.guildHandler.handleGuildCreate(guild);
  }
}
