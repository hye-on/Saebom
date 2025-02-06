import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Events } from 'discord.js';
import { SlashInteractionListener } from '../interaction/listeners/slash.interaction.listener';
import { GuildCreateListener } from '../interaction/listeners/guild-create.listener';

@Injectable()
export class DiscordService implements OnModuleInit {
  constructor(
    private readonly client: Client,
    private readonly configService: ConfigService,
    private readonly slashInteractionListener: SlashInteractionListener,
    private readonly guildCreateListener: GuildCreateListener
  ) {}

  async onModuleInit(): Promise<void> {
    const token = this.configService.get<string>('DISCORD_TOKEN');

    if (!token) {
      throw new Error('DISCORD_TOKEN is not defined in .env');
    }

    this.registerListeners();
    await this.client.login(token);
  }

  private registerListeners(): void {
    this.client.on(Events.InteractionCreate, async interaction => {
      await this.slashInteractionListener.handle(interaction);
    });
    this.client.on(Events.GuildCreate, async guild => {
      await this.guildCreateListener.handle(guild);
    });
  }
}
