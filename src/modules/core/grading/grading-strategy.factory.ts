import { Injectable } from '@nestjs/common';
import { ProblemType } from '@src/database/types';
import { GradingStrategy } from './grading-strategy.interface';
import { DescriptiveGradingStrategy } from './strategies/descriptive-grading.strategy';
import { BlankGradingStrategy } from './strategies/blank-grading.strategy';

@Injectable()
export class GradingStrategyFactory {
  private readonly strategies: Map<ProblemType, GradingStrategy>;

  constructor(descriptiveStrategy: DescriptiveGradingStrategy, blankStrategy: BlankGradingStrategy) {
    this.strategies = new Map([
      [ProblemType.DESCRIPTIVE, descriptiveStrategy],
      [ProblemType.BLANK, blankStrategy],
    ]);
  }

  public getStrategy(problemType: ProblemType): GradingStrategy {
    const strategy = this.strategies.get(problemType);
    if (!strategy) {
      throw new Error(`No grading strategy found for type: ${problemType}`);
    }

    return strategy;
  }
}
