import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { MotivationType } from '../types';

@Entity()
export class MotivationMessage extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  content!: string;

  @Property()
  @Enum(() => MotivationType)
  type: MotivationType = MotivationType.DAILY;
}
