import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits, Events } from 'discord.js';
import { InteractionListener } from '../listeners/handlers/interaction.listener';

@Injectable()
export class DiscordService implements OnModuleInit {
  private client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly interactionListener: InteractionListener
  ) {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds],
    });
  }

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
      await this.interactionListener.handle(interaction);
    });
  }
}
