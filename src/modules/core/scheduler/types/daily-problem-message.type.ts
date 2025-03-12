import { Problem } from '@src/database/entities';

export interface ProblemMessageOptions {
  problem: Problem;
  timestamp: Date;
}
