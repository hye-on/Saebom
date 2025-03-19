import { ReviewStep } from '@src/database/types/review-step.type';

export enum ReviewStepInterval {
  FIRST_REPEAT = 1,
  SECOND_REPEAT = 7,
  THIRD_REPEAT = 30,
  FOURTH_REPEAT = 90,
}

export const getReviewInterval = (step: ReviewStep): number => {
  return ReviewStepInterval[step] ?? 1;
};

export const getNextStep = (step: ReviewStep): ReviewStep | null => {
  const stepOrder = [
    ReviewStep.FIRST_REPEAT,
    ReviewStep.SECOND_REPEAT,
    ReviewStep.THIRD_REPEAT,
    ReviewStep.FOURTH_REPEAT,
  ];

  const currentIndex = stepOrder.indexOf(step);
  return currentIndex !== -1 && currentIndex < stepOrder.length - 1 ? stepOrder[currentIndex + 1] : null;
};
