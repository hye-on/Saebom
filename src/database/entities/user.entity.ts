import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
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
