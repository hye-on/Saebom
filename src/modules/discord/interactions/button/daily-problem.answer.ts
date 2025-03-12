import { Injectable } from '@nestjs/common';
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';
import { LoggerService } from '@src/common/logger/logger.service';
import { ProblemType } from '@src/database/types';
import { ButtonCommand } from '../core/interfaces/button.interface';
import { Button } from '../core/decorators/button.decorator';

@Injectable()
@Button('problem_answer')
export class DailyProblemAnswer implements ButtonCommand {
  constructor(private readonly logger: LoggerService) {}

  async execute(interaction: ButtonInteraction): Promise<void> {
    await this.showAnswerModal(interaction);
  }

  private async showAnswerModal(interaction: ButtonInteraction): Promise<void> {
    const modal = new ModalBuilder().setCustomId('answer_modal').setTitle('문제 답변');
    const embed = interaction.message.embeds[0];
    if (!embed) {
      this.logger.warn('No embed found in the interaction message.');
      return;
    }

    const description = embed.description || '';
    const typeField = embed.fields.find(field => field.name === '문제 유형');
    const type = typeField?.value as ProblemType;

    modal.addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('question')
          .setLabel('문제')
          .setValue(description)
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(false)
      )
    );

    switch (type) {
      case ProblemType.BLANK: {
        const rawCount = (description.match(/\[.*?\]/g) || []).length;
        const blankCount = Math.min(rawCount, 5);
        for (let i = 0; i < blankCount; i++) {
          modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(
              new TextInputBuilder()
                .setCustomId(`blank_${i}`)
                .setLabel(`빈칸 ${i + 1}`)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('빈칸에 들어갈 단어를 입력하세요')
                .setRequired(true)
            )
          );
        }
        break;
      }
      case ProblemType.DESCRIPTIVE: {
        modal.addComponents(
          new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
              .setCustomId('answer')
              .setLabel('답변 작성')
              .setPlaceholder('서술형 답변을 작성하세요')
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          )
        );
        break;
      }
      default: {
        this.logger.warn('Unknown problem type', { type });
        break;
      }
    }

    await interaction.showModal(modal);
  }
}
