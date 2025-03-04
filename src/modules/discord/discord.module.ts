import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../../common/logger/logger.module';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { DeployCommandsService } from './services/client/deploy-commands.service';
import { DiscordService } from './services/client/discord.service';
import { DiscordGateway } from './services/gateway/discord.gateway';
import { InteractionsModule } from './interactions/interactions.module';
import { EventsModule } from './events/event.module';
import { MessageBatchSenderService } from './services/batch-sender/message-batch-sender.service';

@Module({
  imports: [AppLoggerModule, InteractionsModule, EventsModule],
  providers: [
    {
      provide: Client,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const client = new Client({
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        });

        const token = configService.get<string>('DISCORD_TOKEN');

        await client.login(token);
        return client;
      },
    },
    DeployCommandsService,
    DiscordService,
    DiscordGateway,
    MessageBatchSenderService,
  ],
  exports: [DiscordService, DiscordGateway, MessageBatchSenderService],
})
export class DiscordModule {}
