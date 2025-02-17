import { REST, Routes } from 'discord.js';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerService } from '../../common/logger/logger.service';
import { CommandRegistry } from '../discord-event/handlers/interaction/slash/slash.command.registry';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class DeployCommandsService implements OnApplicationBootstrap {
  private readonly rest: REST;
  private readonly clientId: string;
  private readonly guildId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandRegistry: CommandRegistry,
    private readonly logger: LoggerService
  ) {
    const token = this.configService.get<string>('DISCORD_TOKEN');
    this.clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    this.guildId = this.configService.get<string>('DISCORD_GUILD_ID');

    if (!token || !this.clientId || !this.guildId) {
      throw new Error('DISCORD_TOKEN, DISCORD_CLIENT_ID, or DISCORD_GUILD_ID is not set in the environment variables.');
    }

    this.rest = new REST({ version: '10' }).setToken(token);
  }

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('DeployCommandsService: Initializing and deploying commands...');
    await this.deployCommands();
  }
  @CatchError({ rethrow: true })
  async deployCommands(): Promise<void> {
    const commands = Array.from(this.commandRegistry.getCommands().values()).map(command => command.data.toJSON());

    this.logger.log('Started refreshing application commands', {
      commandCount: commands.length,
    });

    const data = await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
      body: commands,
    });

    this.logger.log('Successfully reloaded application commands', {
      reloadedCount: Array.isArray(data) ? data.length : 0,
    });
  }
}
