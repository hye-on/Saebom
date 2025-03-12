import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User, UserProblemHistory } from '@src/database/entities';

import { UserProblemHistoryRepository } from './user-problem-history.repository';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [MikroOrmModule.forFeature([User, UserProblemHistory])],
  providers: [UserProblemHistoryRepository, UserRepository, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
