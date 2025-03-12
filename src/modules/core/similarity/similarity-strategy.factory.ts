import { Injectable } from '@nestjs/common';
import { SimilarityStrategy } from './similarity-strategy.interface';
import { JaccardSimilarityStrategy } from './strategies/jaccard-similarity.strategy';
import { SimilarityType } from './similarity-type.enum';

@Injectable()
export class SimilarityStrategyFactory {
  private readonly strategies: Map<SimilarityType, SimilarityStrategy>;

  constructor(jaccardStrategy: JaccardSimilarityStrategy) {
    this.strategies = new Map([[SimilarityType.JACCARD, jaccardStrategy]]);
  }

  getStrategy(similarityType: SimilarityType): SimilarityStrategy {
    const strategy = this.strategies.get(similarityType);
    if (!strategy) {
      throw new Error(`No similarity strategy found for type: ${similarityType}`);
    }
    return strategy;
  }
}
