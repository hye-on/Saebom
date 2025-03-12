import { Injectable } from '@nestjs/common';
import { SimilarityStrategy } from '../similarity-strategy.interface';

/**
 * TODO: 유사도 측정 정확도 향상 시키기
 */
@Injectable()
export class JaccardSimilarityStrategy implements SimilarityStrategy {
  calculate(text1: string, text2: string): number {
    const set1 = new Set(text1.toLowerCase().trim().split(/\s+/));
    const set2 = new Set(text2.toLowerCase().trim().split(/\s+/));

    const intersection = new Set([...set1].filter(word => set2.has(word)));
    const union = new Set([...set1, ...set2]);

    return union.size === 0 ? 0 : intersection.size / union.size;
  }
}
