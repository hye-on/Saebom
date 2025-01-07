import { REST, Routes } from 'discord.js';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler } from '../commands/handlers/command.handler';
@Injectable()
export class DeployCommandsService implements OnApplicationBootstrap {
  private readonly rest: REST;
  private readonly clientId: string;
  private readonly guildId: string;

  constructor(private readonly configService: ConfigService, private readonly commandHandler: CommandHandler) {
    // 환경 변수 로드
    const token = this.configService.get<string>('DISCORD_TOKEN');
    this.clientId = this.configService.get<string>('DISCORD_CLIENT_ID');
    this.guildId = this.configService.get<string>('DISCORD_GUILD_ID');

    if (!token || !this.clientId || !this.guildId) {
      throw new Error('DISCORD_TOKEN, DISCORD_CLIENT_ID, or DISCORD_GUILD_ID is not set in the environment variables.');
    }

    // Discord REST 클라이언트 초기화
    this.rest = new REST({ version: '10' }).setToken(token);
  }

  async onApplicationBootstrap(): Promise<void> {
    console.log('DeployCommandsService: Initializing and deploying commands...');
    await this.deployCommands();
  }

  async deployCommands(): Promise<void> {
    try {
      const commands = Array.from(this.commandHandler.getCommands().values()).map(command => command.data.toJSON());

      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data = await this.rest.put(Routes.applicationGuildCommands(this.clientId, this.guildId), {
        body: commands,
      });

      console.log(`Successfully reloaded ${Array.isArray(data) ? data.length : 0} application (/) commands.`);
    } catch (error) {
      console.error('Error reloading commands:', error);
    }
  }
}
