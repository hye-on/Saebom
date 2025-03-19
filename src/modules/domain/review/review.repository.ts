import { Injectable } from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { ReviewSchedule } from '@src/database/entities/review-schedule.entity';
import { ReviewStep } from '@src/database/types/review-step.type';
import { LoggerService } from '@src/common/logger/logger.service';
import { User } from '@src/database/entities/user.entity';
import { Problem } from '@src/database/entities/problem.entity';
import { CreateScheduleData } from './review.types';

@Injectable()
export class ReviewScheduleRepository {
  constructor(private readonly em: EntityManager, private readonly logger: LoggerService) {}

  async findById(id: number): Promise<ReviewSchedule | null> {
    return this.findOne({ id });
  }

  async findActive(userId: number, problemId: number, step: ReviewStep): Promise<ReviewSchedule | null> {
    return this.findOne({
      user: { id: userId },
      problem: { id: problemId },
      reviewStep: step,
      isCompleted: false,
    });
  }

  async findTodayActiveWithProblems(userIds: number[]): Promise<ReviewSchedule[]> {
    return this.em.find(
      ReviewSchedule,
      {
        user: { id: { $in: userIds } },
        reviewDate: this.getTodayDate(),
        isCompleted: false,
      },
      {
        populate: ['user', 'problem'],
      }
    );
  }

  async create(data: CreateScheduleData): Promise<ReviewSchedule> {
    const schedule = this.em.create(ReviewSchedule, {
      user: this.em.getReference(User, data.userId),
      problem: this.em.getReference(Problem, data.problemId),
      reviewDate: data.reviewDate,
      reviewStep: data.reviewStep,
      isCompleted: false,
    });

    await this.em.persistAndFlush(schedule);
    return schedule;
  }

  async updateCompleted(id: number): Promise<void> {
    await this.em.nativeUpdate(
      ReviewSchedule,
      { id },
      {
        isCompleted: true,
        updatedAt: new Date(),
      }
    );
  }

  /**
   * 공통 조회 메서드
   */
  private async findOne(query: FilterQuery<ReviewSchedule>): Promise<ReviewSchedule | null> {
    return this.em.findOne(ReviewSchedule, query);
  }

  /**
   * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
   */
  private getTodayDate(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
}
