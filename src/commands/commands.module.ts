import { Module } from '@nestjs/common';
import { CommandHandler } from './handlers/command.handler';
import { DeployCommandsService } from '../discord/deploy-commands.service';
import { AppLoggerModule } from '../common/logger/logger.module';

@Module({
  imports: [AppLoggerModule],
  providers: [CommandHandler, DeployCommandsService],
  exports: [CommandHandler, DeployCommandsService],
})
export class CommandsModule {}
