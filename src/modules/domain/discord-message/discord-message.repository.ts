import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DiscordMessage } from '@src/database/entities/discord-message.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class DiscordMessageRepository {
  constructor(
    @InjectRepository(DiscordMessage)
    private readonly repository: EntityRepository<DiscordMessage>
  ) {}

  /** 메시지 저장 */
  async saveMessage(data: {
    channelId: string;
    guildId: string;
    discordMessageId: string;
    content: any;
    metadata?: any;
  }): Promise<void> {
    const em = this.repository.getEntityManager().fork();
    const message = this.repository.create(data);
    await em.persistAndFlush(message);
  }

  /** Discord 메시지 ID로 조회 */
  async findByDiscordMessageId(discordMessageId: string): Promise<DiscordMessage | null> {
    const em = this.repository.getEntityManager().fork();
    return await em.findOne(DiscordMessage, { discordMessageId });
  }

  /** 특정 채널의 메시지 조회 */
  async findByChannelId(channelId: string): Promise<DiscordMessage[]> {
    const em = this.repository.getEntityManager().fork();
    return await em.find(DiscordMessage, { channelId });
  }
}
