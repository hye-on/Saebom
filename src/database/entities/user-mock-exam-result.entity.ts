import { Entity, Property, PrimaryKey, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity';
import { MockExam } from './mock-exam.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class UserMockExamResult extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => MockExam)
  exam!: MockExam;

  @Property()
  score!: number;

  @Property()
  completedAt = new Date();
}
