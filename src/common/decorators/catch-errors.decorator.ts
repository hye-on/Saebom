import { CommandInteraction, DiscordAPIError, RateLimitError } from 'discord.js';
import { AppException } from '../errors/exceptions/app.exception';

interface ErrorHandlerOptions {
  reply?: boolean;
  rethrow?: boolean;
}

const DEFAULT_ERROR_MESSAGE = '관리자에게 문의해 주시면 도움드리도록 하겠습니다! ✨';
const RATE_LIMIT_MESSAGE = '너무 많은 요청이 있었어요 ⚡ 잠시 후에 다시 시도해 주세요! ✨';
const DISCORD_ERROR_MESSAGE = '디스코드 서버와 연결하는 데 문제가 있어요 ! 잠시 후에 다시 시도해 주세요! ✨';

export function CatchError(options: ErrorHandlerOptions = {}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        await handleError(error, args[0], options);
      }
    };

    return descriptor;
  };
}

async function handleError(
  error: unknown,
  interaction: CommandInteraction,
  options: ErrorHandlerOptions
): Promise<void> {
  if (options.reply) {
    await sendErrorMessage(error, interaction);
  }

  if (options.rethrow) {
    throw error;
  }
}

async function sendErrorMessage(error: unknown, interaction: CommandInteraction): Promise<void> {
  try {
    const errorMessage = getErrorMessage(error);
    await sendInteractionResponse(interaction, errorMessage);
  } catch (replyError) {
    console.error('Error while sending error message', replyError);
  }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof AppException) {
    return error.message;
  }
  if (error instanceof RateLimitError) {
    return RATE_LIMIT_MESSAGE;
  }
  if (error instanceof DiscordAPIError) {
    return DISCORD_ERROR_MESSAGE;
  }
  return DEFAULT_ERROR_MESSAGE;
}

async function sendInteractionResponse(interaction: CommandInteraction, content: string): Promise<void> {
  const response = { content, ephemeral: true };

  if (!interaction.deferred && !interaction.replied) {
    await interaction.reply(response);
  } else {
    await interaction.followUp(response);
  }
}
