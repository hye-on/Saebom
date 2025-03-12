export const ErrorMessage = {
  NotFound: {
    PROBLEM: { code: 'NOT_FOUND_PROBLEM', message: '문제를 찾을 수 없습니다.' },
  },
  Invalid: {
    CHANNEL_TYPE: { code: 'INVALID_CHANNEL_TYPE', message: '잘못된 채널 타입입니다.' },
  },
  Internal: {
    SERVER_ERROR: { code: 'INTERNAL_SERVER_ERROR', message: '서버 내부 오류가 발생했습니다.' },
  },
} as const;
