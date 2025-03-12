export interface SimilarityStrategy {
  /**
   * 예시 답안과 사용자 답안 간의 유사도를 계산합니다.
   * @param exampleAnswer 기대하는 답안
   * @param userAnswer 사용자가 제출한 답안
   * @returns 0.0부터 1.0까지의 유사도 점수
   */
  calculate(exampleAnswer: string, userAnswer: string): number;
}
