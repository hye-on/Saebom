import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerModule } from './common/logger/logger.module';
import { DiscordModule } from './modules/discord/discord.module';
import { DatabaseModule } from './database/database.module';
import { ProblemModule } from './modules/domain/problem/problem.module';
import { ChannelModule } from './modules/domain/channel/channel.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'prod' ? { target: 'pino-pretty' } : undefined,
        level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'info',
      },
    }),
    AppLoggerModule,
    DiscordModule,
    DatabaseModule,
    ProblemModule,
    ChannelModule,
    ScheduleModule.forRoot(),
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
