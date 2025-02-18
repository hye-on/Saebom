import { SetMetadata } from '@nestjs/common';
import { CommandMetadata } from '../types/metadata.type';

export const COMMAND_METADATA = 'discord:command';

export const Command = (metadata: CommandMetadata): ClassDecorator => {
  return SetMetadata(COMMAND_METADATA, metadata);
};
