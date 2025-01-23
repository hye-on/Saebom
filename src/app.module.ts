import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandsModule } from './commands/commands.module';
import { AppLoggerModule } from './common/logger/logger.module';
import { DiscordModule } from './discord/discord.module';
import { ListenersModule } from './listeners/listeners.modules';
import { DatabaseModule } from './database/database.module';

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
    CommandsModule,
    ListenersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
