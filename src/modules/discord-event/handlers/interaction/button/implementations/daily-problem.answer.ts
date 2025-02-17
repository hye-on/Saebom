import { Injectable } from '@nestjs/common';
import { ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js';

import { LoggerService } from '@src/common/logger/logger.service';
import { ButtonCommand } from '../interfaces/button.command.interface';
import { ProblemType } from '@src/database/types';

@Injectable()
export class DailyProblemAnswer implements ButtonCommand {
  readonly customId = 'problem_answer';

  constructor(private readonly logger: LoggerService) {}
  async execute(interaction: ButtonInteraction): Promise<void> {
    await this.showAnswerModal(interaction);
  }

  private async showAnswerModal(interaction: ButtonInteraction) {
    const modal = new ModalBuilder().setCustomId('answer_modal').setTitle('문제 답변');

    const description = interaction.message.embeds[0].description || '';
    const typeField = interaction.message.embeds[0].fields.find(field => field.name === '문제 유형');
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
        const blankCount = (description.match(/\[.*?\]/g) || []).length;
        Array.from({ length: blankCount }, (_, i) =>
          modal.addComponents(
            new ActionRowBuilder<TextInputBuilder>().addComponents(
              new TextInputBuilder()
                .setCustomId(`blank_${i}`)
                .setLabel(`빈칸 ${i + 1}`)
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('빈칸에 들어갈 단어를 입력하세요')
                .setRequired(true)
            )
          )
        );
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
    }

    await interaction.showModal(modal);
  }
}
