import { Injectable } from '@nestjs/common';
import { ButtonInteraction } from 'discord.js';
import { ButtonCommand } from './interfaces/button.command.interface';
import { DailyProblemAnswer } from './implementations/daily-problem.answer';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';

@Injectable()
export class ButtonHandler {
  private buttons: Map<string, ButtonCommand>;

  constructor(private readonly answerButton: DailyProblemAnswer) {
    this.buttons = new Map();
    this.registerButtons();
  }

  private registerButtons() {
    this.buttons.set(this.answerButton.customId, this.answerButton);
  }

  @CatchError({ reply: true })
  async handleButtonInteraction(interaction: ButtonInteraction): Promise<void> {
    const button = this.buttons.get(interaction.customId);

    if (button) {
      await button.execute(interaction);
    }
  }
}
