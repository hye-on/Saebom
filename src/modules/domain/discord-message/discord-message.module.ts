import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DiscordMessage } from '@src/database/entities/discord-message.entity';
import { DiscordMessageRepository } from './discord-message.repository';

@Module({
  imports: [MikroOrmModule.forFeature([DiscordMessage])],
  providers: [DiscordMessageRepository],
})
export class DiscordMessageModule {}
