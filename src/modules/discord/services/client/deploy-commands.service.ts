import { REST, Routes } from 'discord.js';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { LoggerService } from '../../../../common/logger/logger.service';
import { InteractionDiscovery } from '../../interactions/core/discovery/interaction.discovery';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class DeployCommandsService implements OnApplicationBootstrap {
  private readonly rest: REST;
  private readonly clientId: string;
  private readonly guildId?: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly commandDiscoveryService: InteractionDiscovery,
    private readonly logger: LoggerService
  ) {
    const token = this.configService.get<string>('DISCORD_TOKEN');
    this.clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    this.guildId = this.configService.get<string>('DISCORD_GUILD_ID'); // 길드 ID는 선택적

    if (!token || !this.clientId) {
      throw new Error('DISCORD_TOKEN or DISCORD_CLIENT_ID is not set in the environment variables.');
    }

    this.rest = new REST({ version: '10' }).setToken(token);
  }

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('DeployCommandsService: Initializing and deploying commands...');
    await this.deployCommands();
  }

  @CatchError({ rethrow: true })
  async deployCommands(): Promise<void> {
    const commands = Array.from(this.commandDiscoveryService.getCommands().values()).map(command =>
      command.getData().toJSON()
    );

    this.logger.log('Started refreshing application commands', {
      commandCount: commands.length,
    });

    let data;
    if (this.guildId) {
      // 특정 길드에만 명령어 배포
      this.logger.log(`Deploying commands to guild: ${this.guildId}`);
      data = await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: commands,
      });
    } else {
      // 전역 명령어 배포
      this.logger.log('Deploying commands globally.');
      data = await this.rest.put(Routes.applicationCommands(this.clientId), {
        body: commands,
      });
    }

    this.logger.log('Successfully reloaded application commands', {
      reloadedCount: Array.isArray(data) ? data.length : 0,
    });
  }
}
