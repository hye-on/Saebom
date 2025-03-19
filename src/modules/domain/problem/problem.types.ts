import { AnswerDetails, CSCategory, Difficulty, UserAnswer } from '@src/database/types';

export type ProblemInfo = {
  id: number;
  title: string;
  content: string;
  difficulty: Difficulty;
  category: CSCategory;
};

export type UserAnswerData = {
  userId: number;
  problemId: number;
  userAnswer: UserAnswer;
  result: AnswerDetails;
  isCorrect: boolean;
  solvedAt: Date;
};
