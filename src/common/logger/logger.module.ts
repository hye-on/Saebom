import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DiscordEventLogger } from './discord.event.logger';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'prod' ? { target: 'pino-pretty' } : undefined,
        level: process.env.NODE_ENV !== 'prod' ? 'debug' : 'log',
        autoLogging: false,
        base: {
          app: 'discord-bot',
        },
        formatters: {
          level: label => {
            return { level: label };
          },
        },
      },
    }),
  ],
  providers: [DiscordEventLogger, LoggerService],
  exports: [LoggerModule, DiscordEventLogger, LoggerService],
})
export class AppLoggerModule {}
