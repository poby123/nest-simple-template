import { HttpStatus } from '@nestjs/common';
import { ResultResponse } from './response.result';

// USERS
export const GET_USER_SUCCESS: ResultResponse = {
  status: HttpStatus.OK,
  code: 'U001',
  message: '사용자 조회에 성공했습니다',
};

export const GET_ALL_USERS_SUCCESS: ResultResponse = {
  status: HttpStatus.OK,
  code: 'U002',
  message: '모든 사용자 조회에 성공했습니다',
};
