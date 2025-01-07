import { Injectable } from '@nestjs/common';
import { Client } from 'discord.js';
import { Listener } from '../interfaces/listener.interface';

@Injectable()
export class ReadyListener implements Listener<Client> {
  async handle(client: Client): Promise<void> {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
  }
}
