import { HttpStatus } from '@nestjs/common';
import { ErrorResponseType } from './type.error';

// global
export const INVALID_REQUEST: ErrorResponseType = {
  status: HttpStatus.BAD_REQUEST,
  code: 'G001',
  message: '올바르지 않은 입력입니다.',
};

export const INTERNAL_SERVER_ERROR: ErrorResponseType = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  code: 'G002',
  message: '내부 서버 오류입니다.',
};

// user
export const USER_NOT_FOUND: ErrorResponseType = {
  status: HttpStatus.NOT_FOUND,
  code: 'U001',
  message: '존재하지 않는 사용자입니다.',
};
