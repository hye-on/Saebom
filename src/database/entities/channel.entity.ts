import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { ChannelType } from '../types/channel.type';

@Entity({ tableName: 'channels' })
export class Channel extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  guildId!: string;

  @Property()
  channelId!: string;

  @Enum(() => ChannelType)
  type!: ChannelType;
}
