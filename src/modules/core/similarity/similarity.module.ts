import { Module } from '@nestjs/common';
import { SimilarityStrategyFactory } from './similarity-strategy.factory';
import { JaccardSimilarityStrategy } from './strategies/jaccard-similarity.strategy';
import { SimilarityService } from './similarity.service';

@Module({
  providers: [JaccardSimilarityStrategy, SimilarityStrategyFactory, SimilarityService],
  exports: [SimilarityStrategyFactory, SimilarityService, JaccardSimilarityStrategy],
})
export class SimilarityModule {}
