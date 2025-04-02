import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MotivationMessage } from '@src/database/entities/motivation-message.entity';
import { MotivationMessageRepository } from './motivation-message.repository';
import { MotivationMessageService } from './motivation-message.service';

@Module({
  imports: [MikroOrmModule.forFeature([MotivationMessage])],
  providers: [MotivationMessageRepository, MotivationMessageService],
  exports: [MotivationMessageService, MotivationMessageRepository],
})
export class MotivationMessageModule {}
