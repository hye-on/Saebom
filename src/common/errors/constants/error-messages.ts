export const ErrorMessage = {
  NotFound: {
    PROBLEM: { code: 'NOT_FOUND_PROBLEM', message: '문제를 찾을 수 없습니다.' },
    REVIEW_SCHEDULE: { code: 'NOT_FOUND_REVIEW_SCHEDULE', message: '복습 일정을 찾을 수 없습니다.' },
    USER: { code: 'NOT_FOUND_USER', message: '사용자를 찾을 수 없습니다.' },
  },
  Validation: {
    INVALID_INPUT: { code: 'INVALID_INPUT', message: '유효하지 않은 입력 데이터입니다.' },
    INVALID_REVIEW_STEP: { code: 'INVALID_REVIEW_STEP', message: '유효하지 않은 복습 단계입니다.' },
    INVALID_REVIEW_SCHEDULE_ID: { code: 'INVALID_SCHEDULE_ID', message: '유효하지 않은 복습 일정 ID입니다.' },
  },
  Internal: {
    SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', message: '서버 내부 오류가 발생했습니다.' },
  },
  Invalid: {
    CHANNEL_TYPE: { code: 'INVALID_CHANNEL_TYPE', message: '잘못된 채널 타입입니다.' },
  },
} as const;
