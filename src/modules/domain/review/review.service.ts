import { Injectable } from '@nestjs/common';
import { ReviewScheduleRepository } from './review.repository';
import { ReviewSchedule } from '@src/database/entities/review-schedule.entity';
import { ReviewStep } from '@src/database/types/review-step.type';
import { LoggerService } from '@src/common/logger/logger.service';
import { AppException } from '@src/common/errors/exceptions/app.exception';
import { ErrorMessage } from '@src/common/errors/constants/error-messages';
import { CatchError } from '@src/common/decorators/catch-errors.decorator';
import { User } from '@src/database/entities';
import { CreateReviewParams, TodayReviewInfo } from './review.types';
import { getNextStep, getReviewInterval } from './review.constants';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewScheduleRepository, private readonly logger: LoggerService) {}

  /**
   * 복습 일정 생성
   */
  @CatchError({ reply: false })
  async createReviewSchedule(params: CreateReviewParams): Promise<ReviewSchedule> {
    this.validateCreateReviewParams(params);
    const { userId, problemId, skipIfExists = true } = params;
    const reviewStep = params.reviewStep ?? ReviewStep.FIRST_REPEAT;

    const existingSchedule = skipIfExists ? await this.findExistingSchedule(userId, problemId, reviewStep) : null;
    if (existingSchedule) return existingSchedule;

    return this.saveNewSchedule(userId, problemId, reviewStep);
  }

  private async findExistingSchedule(userId: number, problemId: number, reviewStep: ReviewStep) {
    const existingSchedule = await this.reviewRepository.findActive(userId, problemId, reviewStep);
    return existingSchedule;
  }

  private async saveNewSchedule(userId: number, problemId: number, reviewStep: ReviewStep): Promise<ReviewSchedule> {
    const reviewDate = this.calculateReviewDate(reviewStep);
    const schedule = await this.reviewRepository.create({ userId, problemId, reviewDate, reviewStep });

    return schedule;
  }

  /**
   * 복습 완료 처리 및 다음 단계 예약
   */
  @CatchError({ reply: false })
  async afterReviewCompletion(reviewScheduleId: number, isCorrect: boolean) {
    this.validateScheduleId(reviewScheduleId);
    const currentSchedule = await this.reviewRepository.findById(reviewScheduleId);
    if (!currentSchedule) {
      throw new AppException(ErrorMessage.NotFound.REVIEW_SCHEDULE);
    }
    await this.reviewRepository.updateCompleted(reviewScheduleId);
    await this.scheduleNextReview(currentSchedule, isCorrect);
  }

  /**
   * 다음 복습 일정 예약
   */
  @CatchError({ reply: false })
  async scheduleNextReview(currentSchedule: ReviewSchedule, isCorrect: boolean) {
    const nextStep = isCorrect ? getNextStep(currentSchedule.reviewStep) : currentSchedule.reviewStep;
    const hasCompletedAllReviews = isCorrect && !nextStep;

    if (hasCompletedAllReviews) {
      return null;
    }

    await this.createReviewSchedule({
      userId: currentSchedule.user.id,
      problemId: currentSchedule.problem.id,
      reviewStep: nextStep,
      skipIfExists: false,
    });
  }

  /**
   * 오늘 복습 일정 인 문제들 정보
   */
  async getTodayReviewsWithProblems(users: User[]): Promise<TodayReviewInfo[]> {
    const userIds = users.map(user => user.id);
    const reviewsWithProblems = await this.reviewRepository.findTodayActiveWithProblems(userIds);

    return reviewsWithProblems.map(review => ({
      reviewScheduleId: review.id,
      userId: review.user.id,
      discordUserId: review.user.discordUserId,
      username: review.user.username,
      guildId: review.user.guildId,
      reviewStep: review.reviewStep,
      problem: {
        id: review.problem.id,
        title: review.problem.title,
        content: review.problem.content,
        difficulty: review.problem.difficultyLevel,
        category: review.problem.category,
      },
    }));
  }

  /**
   * 복습 날짜 계산 로직
   */
  private calculateReviewDate(step: ReviewStep): Date {
    return new Date(Date.now() + getReviewInterval(step) * 86_400_000); // 86,400,000ms = 1일
  }

  /**
   * ID 유효성 검증
   */
  private isValidId(id: any): boolean {
    return id !== undefined && id !== null && !isNaN(Number(id)) && Number(id) > 0;
  }

  /**
   * 복습 일정 생성 파라미터 검증
   */
  private validateCreateReviewParams(params: CreateReviewParams): void {
    const { userId, problemId, reviewStep } = params;

    if (![userId, problemId].every(this.isValidId)) {
      throw new AppException(ErrorMessage.Validation.INVALID_INPUT);
    }

    if (reviewStep !== undefined && !Object.values(ReviewStep).includes(reviewStep)) {
      throw new AppException(ErrorMessage.Validation.INVALID_REVIEW_STEP);
    }
  }

  /**
   * 스케줄 ID 검증
   */
  private validateScheduleId(reviewScheduleId: number): void {
    if (!this.isValidId(reviewScheduleId)) {
      throw new AppException(ErrorMessage.Validation.INVALID_REVIEW_SCHEDULE_ID);
    }
  }
}
