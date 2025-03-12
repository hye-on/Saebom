import { Entity, PrimaryKey, Property, JsonType } from '@mikro-orm/core';
import { DiscordMessageMetadata } from '../types/discord-message-metadate';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'discord_message' })
export class DiscordMessage extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  channelId!: string;

  @Property()
  guildId!: string;

  @Property()
  discordMessageId!: string;

  @Property({ type: 'jsonb' })
  content?: any;

  @Property({ type: JsonType, nullable: true })
  metadata?: DiscordMessageMetadata;
}
