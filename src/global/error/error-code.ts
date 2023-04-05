import { HttpStatus } from '@nestjs/common';
import { ErrorCodeType } from './types/response-error.type';

const ErrorCode: ErrorCodeType = {
  // global
  INVALID_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    code: 'G001',
    message: '올바르지 않은 입력입니다.',
  },
  SERVER_ERROR: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    code: 'G002',
    message: '내부 서버 오류입니다.',
  },

  // user
  USER_NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: 'U001',
    message: '사용자를 찾을 수 없습니다',
  },
};

export { ErrorCode };
