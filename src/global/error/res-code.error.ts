import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './type.error';

// global
export const INVALID_REQUEST: ErrorResponse = {
  status: HttpStatus.BAD_REQUEST,
  code: 'G001',
  message: '올바르지 않은 입력입니다.',
};

export const INTERNAL_SERVER_ERROR: ErrorResponse = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  code: 'G002',
  message: '내부 서버 오류입니다.',
};

// auth
export const INCORRECT_PASSWORD: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A001',
  message: '비밀번호가 일치하지 않습니다',
};
export const INVALID_JWT: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A002',
  message: '잘못된 토큰입니다.',
};
export const EXPIRED_JWT: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A003',
  message: '만료된 토큰입니다.',
};
export const LOGIN_FAILED: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A004',
  message: '로그인에 실패했습니다.',
};
export const NOT_AUTHORIZED: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A005',
  message: '권한이 없습니다.',
};
export const NOT_EXPIRED_JWT: ErrorResponse = {
  status: HttpStatus.UNAUTHORIZED,
  code: 'A006',
  message: '만료되지 않은 토큰입니다.',
};

// user
export const USER_NOT_FOUND: ErrorResponse = {
  status: HttpStatus.NOT_FOUND,
  code: 'U001',
  message: '존재하지 않는 사용자입니다.',
};
