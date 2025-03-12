import { Injectable } from '@nestjs/common';
import { SimilarityStrategyFactory } from '../../similarity/similarity-strategy.factory';
import { SimilarityType } from '../../similarity/similarity-type.enum';
import { GradingStrategy } from '../grading-strategy.interface';
import { ProblemAnswer, UserAnswer, AnswerDetails } from '@src/database/types';

@Injectable()
export class DescriptiveGradingStrategy implements GradingStrategy {
  constructor(private readonly similarityStrategyFactory: SimilarityStrategyFactory) {}

  grade(problemAnswer: ProblemAnswer, userAnswer: UserAnswer): AnswerDetails {
    if (!('text' in userAnswer) || !('exampleAnswer' in problemAnswer) || !('similarityThreshold' in problemAnswer)) {
      throw new Error('Invalid answer format for descriptive grading');
    }
    const similarityCalculator = this.similarityStrategyFactory.getStrategy(SimilarityType.JACCARD);
    const similarityScore = similarityCalculator.calculate(problemAnswer.exampleAnswer, userAnswer.text);
    const isCorrect = similarityScore >= problemAnswer.similarityThreshold;

    const { matchedKeyPoints, missedKeyPoints } = this.compareKeyPoints(problemAnswer.keyPoints, userAnswer.text);

    return {
      similarityScore,
      matchedKeyPoints,
      missedKeyPoints,
      feedback: this.generateFeedback(isCorrect, matchedKeyPoints, missedKeyPoints),
    };
  }

  private compareKeyPoints(
    keyPoints: string[],
    userAnswer: string
  ): { matchedKeyPoints: string[]; missedKeyPoints: string[] } {
    const matchedKeyPoints: string[] = [];
    const missedKeyPoints: string[] = [];

    for (const keyPoint of keyPoints) {
      const normalizedKeyPoint = keyPoint.toLowerCase();
      const normalizedUserAnswer = userAnswer.toLowerCase();

      if (normalizedUserAnswer.includes(normalizedKeyPoint)) {
        matchedKeyPoints.push(keyPoint);
      } else {
        missedKeyPoints.push(keyPoint);
      }
    }

    return { matchedKeyPoints, missedKeyPoints };
  }

  /**
   * TODO: 상수로 바꾸기
   */
  private generateFeedback(isCorrect: boolean, matchedKeyPoints: string[], missedKeyPoints: string[]): string {
    if (isCorrect) {
      return '정답입니다!';
    }

    if (missedKeyPoints.length === 0) {
      return '중요한 단어를 잘 포함한 답변이네요!';
    }
    return `정답에 가까워지고 있어요! \n 추가해야 할 키포인트: ${missedKeyPoints.join(', ')}`;
  }
}
