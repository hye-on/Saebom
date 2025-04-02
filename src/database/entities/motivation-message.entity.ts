import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'motivation_messages' })
export class MotivationMessage extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  content!: string;
}
