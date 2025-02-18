import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';
import { EventListenerDiscovery } from '../../events/core/discovery/event-listener.discovery';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class DiscordService implements OnModuleInit {
  private readonly client: Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly eventListenerDiscovery: EventListenerDiscovery,
    private readonly logger: LoggerService
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  async onModuleInit(): Promise<void> {
    const token = this.configService.get<string>('DISCORD_TOKEN');

    if (!token) {
      throw new Error('DISCORD_TOKEN is not defined in .env');
    }

    await this.client.login(token);
    this.setupEventListeners();
  }
  @CatchError({ reply: true })
  private setupEventListeners(): void {
    for (const [event, listeners] of this.eventListenerDiscovery['listeners'].entries()) {
      this.client.on(event, async (...args) => {
        const payload = args.length === 1 ? args[0] : args;
        for (const listener of listeners) {
          await listener.handle(payload);
        }
      });

      this.logger.log(`Registered event: ${event}`);
    }
  }

  getClient(): Client {
    return this.client;
  }
}
