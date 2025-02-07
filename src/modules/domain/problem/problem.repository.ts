import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Problem } from '@src/database/entities';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ProblemRepository {
  constructor(
    @InjectRepository(Problem)
    private readonly repository: EntityRepository<Problem>
  ) {}

  async getProblemCount(): Promise<number> {
    const em = this.repository.getEntityManager().fork();
    return await em.count(Problem);
  }

  async findProblemByIndex(index: number): Promise<Problem | null> {
    const em = this.repository.getEntityManager().fork();
    const [problem] = await em.find(
      Problem,
      {},
      {
        offset: index,
        limit: 1,
      }
    );

    return problem;
  }
}
