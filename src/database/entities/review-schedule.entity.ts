import { Entity, Property, PrimaryKey, ManyToOne, Enum } from '@mikro-orm/core';
import { User } from './user.entity';
import { Problem } from './problem.entity';
import { ReviewStep } from '../types';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'review_schedules' })
export class ReviewSchedule extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Problem)
  problem!: Problem;

  @Property({ persist: false })
  reviewDate!: Date;

  @Property()
  @Enum(() => ReviewStep)
  reviewStep: ReviewStep = ReviewStep.FIRST_REPEAT;

  @Property()
  isCompleted = false;
}
