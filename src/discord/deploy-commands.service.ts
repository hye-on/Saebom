import { REST, Routes } from 'discord.js';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '../commands/handlers/command.handler';
import { LoggerService } from '../common/logger/logger.service';

@Injectable()
export class DeployCommandsService implements OnApplicationBootstrap {
  private readonly rest: REST;
  private readonly clientId: string;
  private readonly guildId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandHandler: CommandHandler,
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

  async deployCommands(): Promise<void> {
    try {
      const commands = Array.from(this.commandHandler.getCommands().values()).map(command => command.data.toJSON());

      this.logger.log('Started refreshing application commands', {
        commandCount: commands.length,
      });

      const data = await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: commands,
      });

      this.logger.log('Successfully reloaded application commands', {
        reloadedCount: Array.isArray(data) ? data.length : 0,
      });
    } catch (error) {
      this.logger.error('Error reloading commands', error instanceof Error ? error : new Error('Unknown error'), {
        clientId: this.clientId,
        guildId: this.guildId,
      });
    }
  }
}
