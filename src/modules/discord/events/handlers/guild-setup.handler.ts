import { Injectable } from '@nestjs/common';
import { CategoryChannel, Guild, TextChannel, ChannelType as DiscordChannelType } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';
import { ChannelService } from '@src/modules/domain/channel/channel.service';
import { CHANNELS } from '@src/modules/domain/channel/channel.constant';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { ChannelType } from '@src/database/types';

@Injectable()
export class GuildSetupHandler {
  private readonly CATEGORY_NAME = '🌿 새봄';

  constructor(private readonly logger: LoggerService, private readonly channelService: ChannelService) {}

  /**
   * 길드 설정을 시작합니다.
   */
  @CatchError({ reply: true })
  async setup(guild: Guild): Promise<void> {
    this.logger.debug('Starting guild setup', { guildId: guild.id });

    const category = await this.createCategory(guild);
    const channels = await this.createChannels(guild, category);
    await this.saveChannelConfigs(guild.id, channels);
    const welcomeChannel = channels.find((_, index) => CHANNELS[index].type === ChannelType.CHAT);

    await this.sendWelcomeMessage(welcomeChannel);

    this.logger.log('Guild setup completed successfully', {
      guildId: guild.id,
      guildName: guild.name,
      channelCount: channels.length,
    });
  }

  private async createCategory(guild: Guild): Promise<CategoryChannel> {
    return guild.channels.create({
      name: this.CATEGORY_NAME,
      type: DiscordChannelType.GuildCategory,
    });
  }

  private async createChannels(guild: Guild, category: CategoryChannel): Promise<TextChannel[]> {
    return Promise.all(
      CHANNELS.map(channel =>
        guild.channels.create({
          name: `${channel.emoji}-${channel.name}`,
          type: DiscordChannelType.GuildText,
          parent: category.id,
        })
      )
    );
  }

  private async saveChannelConfigs(guildId: string, channels: TextChannel[]): Promise<void> {
    await Promise.all(
      channels.map((channel, index) => this.channelService.setChannelConfig(guildId, channel.id, CHANNELS[index].type))
    );
  }

  private async sendWelcomeMessage(csChannel: TextChannel): Promise<void> {
    const channelDescriptions = CHANNELS.map(
      channel => `- ${channel.emoji} ${channel.name}: ${channel.description}`
    ).join('\n');

    await csChannel.send({
      embeds: [
        {
          title: '🎉 새봄 봇이 성공적으로 설정되었습니다!',
          description: `다음 채널들이 생성되었습니다:\n${channelDescriptions}\n\n`,
          color: 0x00ff00,
        },
      ],
    });
  }
}
