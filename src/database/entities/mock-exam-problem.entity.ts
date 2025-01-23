import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { Problem } from './problem.entity';
import { MockExam } from './mock-exam.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class MockExamProblem extends BaseEntity {
  @ManyToOne(() => MockExam, { primary: true })
  exam!: MockExam;

  @ManyToOne(() => Problem, { primary: true })
  problem!: Problem;

  @Property()
  problemOrder!: number;
}
