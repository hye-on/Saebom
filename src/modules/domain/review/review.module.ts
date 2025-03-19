import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReviewSchedule } from '../../../database/entities/review-schedule.entity';
import { ReviewScheduleRepository } from './review.repository';
import { ReviewService } from './review.service';

@Module({
  imports: [MikroOrmModule.forFeature([ReviewSchedule])],
  providers: [ReviewScheduleRepository, ReviewService],
  exports: [ReviewService, ReviewScheduleRepository],
})
export class ReviewModule {}
