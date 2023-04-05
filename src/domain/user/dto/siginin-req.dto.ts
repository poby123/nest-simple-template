import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninRequestDto {
  @IsEmail(undefined, { message: '이메일 형식이어야합니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입력입니다.' })
  password: string;
}
