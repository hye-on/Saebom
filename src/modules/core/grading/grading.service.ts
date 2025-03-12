import { Injectable } from '@nestjs/common';
import { GradingStrategyFactory } from './grading-strategy.factory';
import { ProblemType, ProblemAnswer, UserAnswer, AnswerDetails } from '@src/database/types';

@Injectable()
export class GradingService {
  constructor(private readonly gradingStrategyFactory: GradingStrategyFactory) {}

  grade(problemType: ProblemType, problemAnswer: ProblemAnswer, userAnswer: UserAnswer): AnswerDetails {
    const strategy = this.gradingStrategyFactory.getStrategy(problemType);
    return strategy.grade(problemAnswer, userAnswer);
  }
}
