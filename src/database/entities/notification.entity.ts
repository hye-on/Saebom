import { Entity, Property, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { NotificationType } from '../types';

@Entity({ tableName: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @Property()
  content!: string;

  @Enum(() => NotificationType)
  type!: NotificationType;

  @Property()
  isRead = false;
}
