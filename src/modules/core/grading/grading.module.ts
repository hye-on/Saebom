import { Module } from '@nestjs/common';
import { GradingStrategyFactory } from './grading-strategy.factory';
import { DescriptiveGradingStrategy } from './strategies/descriptive-grading.strategy';
import { BlankGradingStrategy } from './strategies/blank-grading.strategy';
import { GradingService } from './grading.service';
import { SimilarityModule } from '../similarity/similarity.module';

@Module({
  imports: [SimilarityModule],
  providers: [DescriptiveGradingStrategy, BlankGradingStrategy, GradingStrategyFactory, GradingService],
  exports: [GradingStrategyFactory, GradingService],
})
export class GradingModule {}
