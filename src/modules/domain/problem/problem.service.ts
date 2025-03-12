import { Injectable } from '@nestjs/common';
import { Problem } from '@src/database/entities';
import { ProblemRepository } from './problem.repository';
import { LoggerService } from '@src/common/logger/logger.service';
import * as crypto from 'crypto';
import { AppException } from '@src/common/errors/exceptions/app.exception';
import { ErrorMessage } from '@src/common/errors/constants/error-messages';
import { UserProblemHistoryRepository } from '../user/user-problem-history.repository';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class ProblemService {
  constructor(
    private readonly problemRepository: ProblemRepository,
    private readonly logger: LoggerService,
    private readonly userProblemHistoryRepository: UserProblemHistoryRepository
  ) {}

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

  /**
   * ID로 문제를 조회합니다.
   */
  @CatchError({ reply: false })
  async getProblemById(id: number): Promise<Problem> {
    const problem = await this.problemRepository.findById(id);

    if (!problem) {
      throw new AppException(ErrorMessage.NotFound.PROBLEM);
    }

    return problem;
  }

  /**
   * 사용자 답변 이력을 저장
   */
  async saveUserAnswer(answerHistory: {
    userId: number;
    problemId: number;
    userAnswer: any;
    result: any;
    isCorrect: boolean;
    solvedAt: Date;
  }): Promise<any> {
    const history = await this.userProblemHistoryRepository.create({
      userId: answerHistory.userId,
      problemId: answerHistory.problemId,
      userAnswer: answerHistory.userAnswer,
      answerDetails: answerHistory.result,
      isCorrect: answerHistory.isCorrect,
      solvedAt: answerHistory.solvedAt,
    });

    return history;
  }
}
