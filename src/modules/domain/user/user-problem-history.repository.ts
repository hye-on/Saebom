import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserProblemHistory } from '@src/database/entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserProblemHistoryRepository {
  constructor(
    @InjectRepository(UserProblemHistory)
    private readonly repository: EntityRepository<UserProblemHistory>
  ) {}

  async create(data: {
    userId: number;
    problemId: number;
    userAnswer: any;
    answerDetails: any;
    isCorrect: boolean;
    solvedAt: Date;
  }): Promise<UserProblemHistory> {
    const em = this.repository.getEntityManager();

    const history = em.create(UserProblemHistory, {
      user: data.userId,
      problem: data.problemId,
      userAnswer: data.userAnswer,
      answerDetails: data.answerDetails,
      isCorrect: data.isCorrect,
      solvedAt: data.solvedAt,
    });

    await em.persistAndFlush(history);
    return history;
  }
}
