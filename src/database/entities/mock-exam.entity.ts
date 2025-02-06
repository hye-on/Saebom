import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';

import { BaseEntity } from './base.entity';
import { Difficulty } from '../types';

@Entity({ tableName: 'mock_exams' })
export class MockExam extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ nullable: true })
  description?: string;

  @Enum(() => Difficulty)
  difficultyLevel: Difficulty = Difficulty.MEDIUM;
}
