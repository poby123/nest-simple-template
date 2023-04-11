export const ACCESS_TOKEN_EXPIRES_TIME = '1h';
export const JWT_TOKEN_TYPE = 'Bearer'; // jwt 토큰 앞에 붙는 타입
export const PREFIX_JWT_TOKEN_TYPE = `${JWT_TOKEN_TYPE} `; // 뒤에 공백에 유의
export const ACCESS_TOKEN_SUBJECT = 'AccessToken'; // jwt payload에 들어갈 타입

export const REFRESH_TOKEN_EXPIRES_TIME = '15d';
export const REFRESH_TOKEN_SUBJECT = 'RefreshToken'; // cookie에 key로 들어갈 타입
