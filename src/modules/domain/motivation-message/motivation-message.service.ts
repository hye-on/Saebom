import { Injectable } from '@nestjs/common';
import { MotivationMessageRepository } from './motivation-message.repository';
import { MotivationMessage } from '@src/database/entities/motivation-message.entity';

const DEFAULT_ENCOURAGEMENT_MESSAGE = '숨 고르기 후 다시 시작하면 더 멀리 갈 수 있어요! 새봄이가 도와줄께요!';
@Injectable()
export class MotivationMessageService {
  constructor(private readonly motivationMessageRepository: MotivationMessageRepository) {}

  async getTodayEncouragement(): Promise<string> {
    const message = await this.getRandomMessage();

    if (message) {
      return message.content;
    }
    return DEFAULT_ENCOURAGEMENT_MESSAGE;
  }

  private async getRandomMessage(): Promise<MotivationMessage | null> {
    const count = await this.motivationMessageRepository.getMessageCount();

    if (count === 0) return null;

    const randomIndex = Math.floor(Math.random() * count);
    return this.motivationMessageRepository.findMessageByIndex(randomIndex);
  }
}
