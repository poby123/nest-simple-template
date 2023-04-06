export const KEY =
  'sdlkfjaklsdfjaoiewiru2938u29834u21klrnlkenfklwenflkaasdfdfsndflkandsfklansdfklsadj32487393lrkjasdfasoidjflksadfsaldkf';

console.log(process.env.TOKEN_KEY);

export const ACCESS_TOKEN_EXPIRES_TIME = '10m';
export const ACCESS_TOKEN_TYPE = 'Bearer'; // jwt 토큰 앞에 붙는 타입
export const PREFIX_ACCESS_TOKEN_TYPE = `${ACCESS_TOKEN_TYPE} `; // 뒤에 공백에 유의
export const PAYLOAD_ACCESS_TOKEN_TYPE = 'AccessToken'; // jwt payload에 들어갈 타입

export const REFRESH_TOKEN_EXPIRES_TIME = '15d';
export const COOKIE_REFRESH_TOKEN_TYPE = 'RefreshToken'; // cookie에 key로 들어갈 타입
