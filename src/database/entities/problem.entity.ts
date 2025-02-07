import { Entity, Property, PrimaryKey, Enum } from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { Difficulty, ProblemType, CSCategory, ProblemAnswer } from '../types';

@Entity({ tableName: 'problems' })
export class Problem extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @Property({ type: 'jsonb' })
  answer!: ProblemAnswer;

  @Property({ nullable: true })
  explanation?: string;

  @Enum(() => ProblemType)
  type: ProblemType = ProblemType.DESCRIPTIVE;

  @Enum(() => Difficulty)
  difficultyLevel: Difficulty = Difficulty.MEDIUM;

  @Enum(() => CSCategory)
  category!: CSCategory;

  @Property({ type: 'array' })
  keywords: string[] = [];
}
