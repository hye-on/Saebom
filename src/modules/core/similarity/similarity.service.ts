import { Injectable } from '@nestjs/common';
import { SimilarityStrategyFactory } from './similarity-strategy.factory';
import { SimilarityType } from './similarity-type.enum';

@Injectable()
export class SimilarityService {
  constructor(private readonly similarityStrategyFactory: SimilarityStrategyFactory) {}

  computeSimilarity(strategyType: SimilarityType, text1: string, text2: string): number {
    const strategy = this.similarityStrategyFactory.getStrategy(strategyType);
    return strategy.calculate(text1, text2);
  }
}
