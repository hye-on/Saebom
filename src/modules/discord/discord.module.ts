import { Module } from '@nestjs/common';
import { DiscordService } from './discord.init.service';
import { ListenersModule } from '../discord-event/listeners/listeners.modules';
import { HandlerModule } from '../discord-event/handlers/handlers.module';
import { AppLoggerModule } from '../../common/logger/logger.module';
import { DiscordGateway } from './discord.gateway';
import { ConfigService } from '@nestjs/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { DeployCommandsService } from './deploy-commands.service';
import { CommandRegistry } from '../discord-event/handlers/interaction/slash/slash.command.registry';

@Module({
  imports: [ListenersModule, HandlerModule, AppLoggerModule],
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
    CommandRegistry,
  ],
  exports: [DiscordService, DiscordGateway],
})
export class DiscordModule {}
