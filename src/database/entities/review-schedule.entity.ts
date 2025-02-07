import { Entity, Property, PrimaryKey, ManyToOne, BaseEntity, Enum } from '@mikro-orm/core';
import { User } from './user.entity';
import { Problem } from './problem.entity';
import { ReviewStep } from '../types';

@Entity({ tableName: 'review_schedules' })
export class ReviewSchedule extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Problem)
  problem!: Problem;

  @Property()
  reviewDate!: Date;

  @Property()
  @Enum(() => ReviewStep)
  reviewStep: ReviewStep = ReviewStep.FIRST_REPEAT;

  @Property()
  isCompleted = false;
}
