import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Channel } from '@src/database/entities/channel.entity';
import { ChannelService } from './channel.service';

@Module({
  imports: [MikroOrmModule.forFeature([Channel])],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
