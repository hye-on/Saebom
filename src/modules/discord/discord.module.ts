import { Module } from '@nestjs/common';
import { AppLoggerModule } from '../../common/logger/logger.module';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { DeployCommandsService } from './services/deploy-commands.service';

import { DiscordGateway } from './services/discord.gateway';
import { InteractionsModule } from './interactions/interactions.module';
import { EventsModule } from './events/event.module';
import { MessageBatchSenderService } from './services/message-batch-sender.service';
import { DiscordService } from './services/discord.service';
import { DiscordMessageRepository } from '../domain/discord-message/discord-message.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DiscordMessage } from '@src/database/entities';

@Module({
  imports: [AppLoggerModule, InteractionsModule, EventsModule, MikroOrmModule.forFeature([DiscordMessage])],
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
    DiscordMessageRepository,
  ],
  exports: [DiscordService, DiscordGateway, MessageBatchSenderService],
})
export class DiscordModule {}
