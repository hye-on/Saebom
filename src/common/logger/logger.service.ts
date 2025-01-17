import { Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class LoggerService {
  constructor(private readonly logger: Logger) {}

  log(message: string, context?: any) {
    this.logger.log({
      message,
      ...context,
      timestamp: new Date().toISOString(),
    });
  }

  error(message: string, error?: Error, context?: any) {
    this.logger.error({
      message,
      error: error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : undefined,
      ...context,
      timestamp: new Date().toISOString(),
    });
  }

  warn(message: string, context?: any) {
    this.logger.warn({
      message,
      ...context,
      timestamp: new Date().toISOString(),
    });
  }

  debug(message: string, context?: any) {
    this.logger.debug({
      message,
      ...context,
      timestamp: new Date().toISOString(),
    });
  }
}
