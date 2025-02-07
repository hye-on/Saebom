import { Injectable } from '@nestjs/common';
import { CategoryChannel, Guild, TextChannel, ChannelType as DiscordChannelType } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';

import { ChannelService } from '@src/modules/domain/channel/channel.service';
import { CHANNELS } from '@src/modules/domain/channel/channel.constant';
@Injectable()
export class GuildHandler {
  private readonly CATEGORY_NAME = '🌿 새봄';

  constructor(private readonly logger: LoggerService, private readonly channelConfigService: ChannelService) {}

  async handleGuildCreate(guild: Guild): Promise<void> {
    const category = await this.createCategory(guild);
    const channels = await this.createChannels(guild, category);
    await this.saveChannelConfigs(guild.id, channels);
    await this.sendWelcomeMessage(channels[2]);

    this.logger.log('Bot channels setup completed', {
      guildId: guild.id,
      guildName: guild.name,
    });
  }

  private async createCategory(guild: Guild) {
    return await guild.channels.create({
      name: this.CATEGORY_NAME,
      type: DiscordChannelType.GuildCategory,
    });
  }

  private async createChannels(guild: Guild, category: CategoryChannel): Promise<TextChannel[]> {
    const channelPromises = CHANNELS.map(channel =>
      guild.channels.create({
        name: `${channel.emoji}-${channel.name}`,
        type: 0,
        parent: category.id,
      })
    );

    return await Promise.all(channelPromises);
  }

  private async saveChannelConfigs(guildId: string, channels: TextChannel[]): Promise<void> {
    const configPromises = channels.map((channel, index) =>
      this.channelConfigService.setChannelConfig(guildId, channel.id, CHANNELS[index].type)
    );

    await Promise.all(configPromises);
  }

  private async sendWelcomeMessage(csChannel: TextChannel): Promise<void> {
    const channelDescriptions = CHANNELS.map(
      channel => `- ${channel.emoji} ${channel.name}: ${channel.description}`
    ).join('\n');

    await csChannel.send({
      embeds: [
        {
          title: '🎉 새봄 봇이 성공적으로 설정되었습니다!',
          description: '다음 채널들이 생성되었습니다:\n' + channelDescriptions + '\n\n',
          color: 0x00ff00,
        },
      ],
    });
  }
}
