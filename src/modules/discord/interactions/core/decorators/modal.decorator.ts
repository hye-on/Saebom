import { SetMetadata } from '@nestjs/common';

export const MODAL_HANDLER_METADATA = 'MODAL_HANDLER_METADATA';
export const Modal = (customId: string): ClassDecorator => SetMetadata(MODAL_HANDLER_METADATA, customId);
