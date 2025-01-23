import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { Problem } from './problem.entity';
import { BaseEntity } from './base.entity';
import { AnswerDetails, UserAnswer } from '../types';

@Entity()
export class UserProblemHistory extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Problem)
  problem!: Problem;

  @Property({ type: 'jsonb' })
  userAnswer!: UserAnswer;

  @Property({ type: 'jsonb' })
  answerDetails!: AnswerDetails;

  @Property()
  isCorrect!: boolean;

  @Property()
  solvedAt = new Date();
}
