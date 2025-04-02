import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { MotivationMessage } from '@src/database/entities/motivation-message.entity';
import { InjectRepository } from '@mikro-orm/nestjs';

/**
 * 응원 메시지 데이터베이스 작업을 처리하는 리포지토리
 */
@Injectable()
export class MotivationMessageRepository {
  constructor(
    @InjectRepository(MotivationMessage)
    private readonly repository: EntityRepository<MotivationMessage>
  ) {}

  async getMessageCount(): Promise<number> {
    const em = this.repository.getEntityManager().fork();
    return await em.count(MotivationMessage);
  }

  async findMessageByIndex(index: number): Promise<MotivationMessage | null> {
    const em = this.repository.getEntityManager().fork();
    const [message] = await em.find(
      MotivationMessage,
      {},
      {
        offset: index,
        limit: 1,
        orderBy: { id: 'ASC' },
      }
    );

    return message;
  }
}
