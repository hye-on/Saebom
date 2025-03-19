import { ReviewStep } from '@src/database/types';
import { ProblemInfo } from '../problem/problem.types';

/**
 * 오늘 전송할 복습 문제 정보들
 */
export type TodayReviewInfo = {
  reviewScheduleId: number;
  userId: number;
  discordUserId: string;
  username: string;
  guildId: string;
  reviewStep: ReviewStep;
  problem: ProblemInfo;
};

/**
 * 복습 일정 생성 파라미터
 */
export type CreateReviewParams = {
  userId: number;
  problemId: number;
  reviewStep?: ReviewStep;
  skipIfExists?: boolean;
};

/**
 * 복습 일정 생성 데이터
 */
export type CreateScheduleData = {
  userId: number;
  problemId: number;
  reviewDate: Date;
  reviewStep: ReviewStep;
};
