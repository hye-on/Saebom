import { ProblemAnswer, UserAnswer, AnswerDetails } from '@src/database/types';

export interface GradingStrategy {
  grade(problemAnswer: ProblemAnswer, userAnswer: UserAnswer): AnswerDetails;
}
