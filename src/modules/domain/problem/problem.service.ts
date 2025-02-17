import { Injectable } from '@nestjs/common';
import { Problem } from '@src/database/entities';
import { ProblemRepository } from './problem.repository';
import { LoggerService } from '@src/common/logger/logger.service';
import * as crypto from 'crypto';
import { AppException } from '@src/common/errors/exceptions/app.exception';
import { ErrorMessage } from '@src/common/errors/constants/error-messages';

@Injectable()
export class ProblemService {
  constructor(private readonly problemRepository: ProblemRepository, private readonly logger: LoggerService) {}

  private async calculateTodayProblemIndex(): Promise<number> {
    const totalProblems = await this.problemRepository.getProblemCount();

    if (totalProblems === 0) {
      throw new AppException(ErrorMessage.NotFound.PROBLEM);
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
      throw new AppException(ErrorMessage.NotFound.PROBLEM);
    }

    return problem;
  }
}
