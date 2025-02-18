import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ICommand } from '../interfaces/command.interface';
import { CommandMetadata } from '../types/metadata.type';
import { Collection } from 'discord.js';
import { COMMAND_METADATA } from '../decorators/command.decorator';

@Injectable()
export class InteractionDiscovery implements OnModuleInit {
  private readonly commands = new Collection<string, ICommand>();

  constructor(private readonly discovery: DiscoveryService, private readonly reflector: Reflector) {}

  async onModuleInit() {
    const wrappers = this.discovery.getProviders();
    const providers = wrappers.filter(wrapper => {
      if (!wrapper.metatype) return false;
      if (!Object.getPrototypeOf(wrapper.metatype)) return false;

      const metadata = this.reflector.get<CommandMetadata>(COMMAND_METADATA, wrapper.metatype);
      return metadata !== undefined;
    });

    for (const provider of providers) {
      const metadata = this.reflector.get<CommandMetadata>(COMMAND_METADATA, provider.metatype);
      const instance = provider.instance as ICommand;

      if (metadata && instance) {
        this.commands.set(metadata.name, instance);
      }
    }
  }

  getCommands(): Collection<string, ICommand> {
    return this.commands;
  }
}
