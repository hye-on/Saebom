import { Module } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Problem, User, UserProblemHistory, Notification, ReviewSchedule } from '@src/database/entities';
import { ProblemRepository } from './problem.repository';
import { AppLoggerModule } from '@src/common/logger/logger.module';
@Module({
  imports: [
    MikroOrmModule.forFeature([Problem, User, UserProblemHistory, Notification, ReviewSchedule]),
    AppLoggerModule,
  ],
  providers: [ProblemService, ProblemRepository],
  exports: [ProblemService, ProblemRepository],
})
export class ProblemModule {}
