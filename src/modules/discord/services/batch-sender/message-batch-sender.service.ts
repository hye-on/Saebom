import { Injectable } from '@nestjs/common';
import { LoggerService } from '@src/common/logger/logger.service';
import { DiscordGateway } from '../gateway/discord.gateway';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from 'discord.js';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

export interface ChannelMessage {
  channelId: string;
  message: {
    embeds: EmbedBuilder[];
    components: ActionRowBuilder<ButtonBuilder>[];
  };
}

@Injectable()
export class MessageBatchSenderService {
  /**
   * 디스코드 Rate Limit
   * - 채널 별: 초당 5개
   * - 봇 전체: 초당 50개
   */
  private readonly CHUNK_SIZE = 30;

  private readonly CHUNK_INTERVAL = 1000;

  constructor(private readonly discordGateway: DiscordGateway, private readonly logger: LoggerService) {}

  /**
   * 청크 단위로 메시지를 병렬 전송
   */
  @CatchError({ rethrow: false })
  async sendToChannels(
    channelMessages: ChannelMessage[]
  ): Promise<Array<{ channelId: string; success: boolean; error?: Error }>> {
    const results = [];
    const chunks = this.chunkArray(channelMessages, this.CHUNK_SIZE);

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      const chunkResults = await Promise.all(
        chunk.map(async ({ channelId, message }) => {
          try {
            await this.discordGateway.sendMessageWithComponents(channelId, message);
            return { channelId, success: true };
          } catch (error) {
            return { channelId, success: false, error };
          }
        })
      );

      results.push(...chunkResults);

      if (i < chunks.length - 1) {
        await this.delay(this.CHUNK_INTERVAL);
      }
    }

    const successCount = results.filter(r => r.success).length;
    this.logger.log(`Completed: ${successCount}/${channelMessages.length} channels successful`);

    return results;
  }

  /**
   * 배열을 청크로 분할합니다.
   */
  private chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, (i + 1) * size));
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
