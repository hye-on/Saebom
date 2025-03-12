import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from '@src/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<User> {
    let user = await this.userRepository.findOne({
      discordUserId: registerUserDto.discordUserId,
      guildId: registerUserDto.guildId,
    });

    if (!user) {
      user = this.userRepository.create(registerUserDto);
      await this.userRepository.persistAndFlush(user);
    } else {
      user.username = registerUserDto.username;
      await this.userRepository.flush();
    }

    return user;
  }
}
