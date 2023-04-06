import { HttpStatus } from '@nestjs/common';
import { ResultResponse } from './response.result';

// AUTH
export const SIGN_IN_SUCCESS: ResultResponse = {
  status: HttpStatus.OK,
  code: 'A001',
  message: '로그인에 성공했습니다.',
};
export const SIGN_OUT_SUCCESS: ResultResponse = {
  status: HttpStatus.OK,
  code: 'A002',
  message: '로그아웃에 성공했습니다',
};
export const REISSUE_SUCCESS: ResultResponse = {
  status: HttpStatus.OK,
  code: 'A003',
  message: '토큰 재발급에 성공했습니다.',
};

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

export const SIGNUP_USER_SUCCESS: ResultResponse = {
  status: HttpStatus.CREATED,
  code: 'U003',
  message: '회원가입에 성공했습니다.',
};
