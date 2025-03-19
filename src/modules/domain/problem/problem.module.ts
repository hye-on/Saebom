import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Problem, User, UserProblemHistory, Notification, ReviewSchedule } from '@src/database/entities';
import { ProblemRepository } from './problem.repository';
import { UserProblemHistoryRepository } from '../user/user-problem-history.repository';
import { ReviewService } from '../review/review.service';
import { ReviewScheduleRepository } from '../review/review.repository';
@Module({
  imports: [MikroOrmModule.forFeature([Problem, User, UserProblemHistory, Notification, ReviewSchedule])],
  providers: [ProblemService, ProblemRepository, UserProblemHistoryRepository, ReviewService, ReviewScheduleRepository],
  exports: [ProblemService, ProblemRepository],
})
export class ProblemModule {}
