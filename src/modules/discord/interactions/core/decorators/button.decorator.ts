import { SetMetadata } from '@nestjs/common';

export const BUTTON_HANDLER_METADATA = 'discord:button';

export const Button = (customId: string): ClassDecorator => {
  return SetMetadata(BUTTON_HANDLER_METADATA, customId);
};
