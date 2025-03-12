import { Entity, Property, PrimaryKey, Unique } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'users' })
@Unique({ properties: ['discordUserId', 'guildId'] })
export class User extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  discordUserId!: string;

  @Property()
  guildId!: string;

  @Property()
  username!: string;

  @Property()
  learningStreak = 0;

  @Property()
  isNotificationEnabled = true;
}
