import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@src/database/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>
  ) {}

  async findIdByDiscordUserId(discordUserId: string): Promise<number | null> {
    const user = await this.repository.findOne({ discordUserId });
    return user ? user.id : null;
  }

  async findOne(where: Partial<User>): Promise<User | null> {
    return this.repository.findOne(where);
  }

  create(data: RegisterUserDto): User {
    return this.repository.create(data);
  }

  async persistAndFlush(entity: User): Promise<void> {
    await this.repository.getEntityManager().persistAndFlush(entity);
  }

  async flush(): Promise<void> {
    await this.repository.getEntityManager().flush();
  }
  async findAllActiveUsers(): Promise<User[]> {
    return this.repository.find({ deletedAt: null });
  }
}
