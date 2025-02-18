import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { IEventListener } from '../interfaces/event-listener.interface';
import { EVENT_LISTENER_METADATA, EventListenerMetadata } from '../decorators/event-listener.decorator';
import { LoggerService } from '@src/common/logger/logger.service';

@Injectable()
export class EventListenerDiscovery implements OnModuleInit {
  private readonly listeners = new Map<string, IEventListener[]>();

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly logger: LoggerService
  ) {}

  async onModuleInit() {
    const wrappers = this.discovery.getProviders();

    const eventListeners = wrappers
      .filter(wrapper => wrapper.metatype)
      .map(wrapper => {
        const metadata = this.reflector.get<EventListenerMetadata>(EVENT_LISTENER_METADATA, wrapper.metatype);
        return { instance: wrapper.instance, metadata };
      })
      .filter(item => item.metadata && item.instance);

    for (const { metadata, instance } of eventListeners) {
      this.logger.log(`Registered event listener for: ${metadata.event}`);
      const listeners = this.listeners.get(metadata.event) || [];
      listeners.push(instance);
      this.listeners.set(metadata.event, listeners);
    }
  }

  getListeners(event: string): IEventListener[] {
    return this.listeners.get(event) || [];
  }
}
