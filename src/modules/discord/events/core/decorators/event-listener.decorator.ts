import { SetMetadata } from '@nestjs/common';

export const EVENT_LISTENER_METADATA = 'discord:event_listener';

export interface EventListenerMetadata {
  event: string;
  once?: boolean;
}

export const EventListener = (metadata: EventListenerMetadata): ClassDecorator => {
  return SetMetadata(EVENT_LISTENER_METADATA, metadata);
};
