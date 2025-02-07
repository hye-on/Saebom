import { Injectable } from '@nestjs/common';
import { Problem } from '@src/database/entities';
import { ProblemRepository } from './problem.repository';
import { LoggerService } from '@src/common/logger/logger.service';
import * as crypto from 'crypto';

@Injectable()
export class ProblemService {
  constructor(private readonly problemRepository: ProblemRepository, private readonly logger: LoggerService) {}

  private async calculateTodayProblemIndex(): Promise<number> {
    const totalProblems = await this.problemRepository.getProblemCount();
    if (totalProblems === 0) {
      const error = new Error('No problems found in database');
      this.logger.error('Failed to calculate problem index', error);
      throw error;
    }

    const today = new Date().toISOString().split('T')[0];
    const hash = crypto.createHash('sha256').update(today).digest('hex');
    const hashNum = parseInt(hash.substring(0, 8), 16);

    return hashNum % totalProblems;
  }

  async getTodayProblem(): Promise<Problem> {
    const index = await this.calculateTodayProblemIndex();
    const problem = await this.problemRepository.findProblemByIndex(index);

    if (!problem) {
      const error = new Error(`Problem not found for index: ${index}`);
      this.logger.error('Failed to get problem', error, { index });
      throw error;
    }

    this.logger.log("Successfully retrieved today's problem", {
      problemId: problem.id,
      category: problem.category,
    });

    return problem;
  }
}
