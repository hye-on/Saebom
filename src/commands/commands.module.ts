import { Module } from '@nestjs/common';
import { CommandHandler } from './handlers/command.handler';
import { DeployCommandsService } from '../discord/deploy-commands.service';

@Module({
  providers: [CommandHandler, DeployCommandsService],
  exports: [CommandHandler, DeployCommandsService],
})
export class CommandsModule {}
