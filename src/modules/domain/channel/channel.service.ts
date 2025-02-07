import { Injectable } from '@nestjs/common';
import { Channel } from '@src/database/entities/channel.entity';

import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ChannelType } from '@src/database/types';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: EntityRepository<Channel>
  ) {}

  async setChannelConfig(guildId: string, channelId: string, type: ChannelType): Promise<Channel> {
    const em = this.channelRepository.getEntityManager();

    const existingConfig = await this.channelRepository.findOne({
      guildId,
      type,
    });

    if (existingConfig) {
      existingConfig.channelId = channelId;
      await em.flush();
      return existingConfig;
    }

    const config = this.channelRepository.create({
      guildId,
      channelId,
      type,
    });

    await em.persistAndFlush(config);
    return config;
  }

  async getChannelsByType(type: ChannelType): Promise<Channel[]> {
    return await this.channelRepository.find({ type });
  }

  async getGuildChannels(guildId: string): Promise<Channel[]> {
    return await this.channelRepository.find({ guildId });
  }
}
