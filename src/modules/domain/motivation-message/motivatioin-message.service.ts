import { Injectable } from '@nestjs/common';
import { LoggerService } from '@src/common/logger/logger.service';
import { MotivationMessageRepository } from './motivation-message.repository';
import { MotivationMessage } from '@src/database/entities/motivation-message.entity';

@Injectable()
export class MotivationMessageService {
  constructor(
    private readonly motivationMessageRepository: MotivationMessageRepository,
    private readonly logger: LoggerService
  ) {}

  async getTodayEncouragement(): Promise<string> {
    const message = await this.getRandomMessage();

    if (message) {
      return message.content;
    }
  }

  private async getRandomMessage(): Promise<MotivationMessage | null> {
    const count = await this.motivationMessageRepository.getMessageCount();

    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);
    return this.motivationMessageRepository.findMessageByIndex(randomIndex);
  }
}
