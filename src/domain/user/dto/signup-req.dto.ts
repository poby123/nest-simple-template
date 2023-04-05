import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entity/user.entity';
import { encrypt } from 'src/domain/auth/utils/bcrypt.utils';

export class SignupRequestDto {
  @IsNotEmpty({ message: '이름은 필수입력입니다.' })
  public name: string;

  @Matches(
    /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&])[A-Za-z0-9$@^!%*#?&]{8,20}$/,
    {
      message:
        '비밀번호는 하나 이상의 대소문자와 숫자 그리고 특수문자로 구성되어야합니다.',
    },
  )
  @MinLength(8, { message: '비밀번호는 최소 8자리이상이어야 합니다.' })
  @MaxLength(20, { message: '비밀번호는 최대 20자리입니다.' })
  public password: string;

  @IsEmail(undefined, { message: '이메일 형식이어야합니다.' })
  public email: string;

  static async toEntity(userSignupDto: SignupRequestDto): Promise<User> {
    const { name, email, password } = userSignupDto;
    const encryptedPassword = await encrypt(password);
    return new User(name, email, encryptedPassword);
  }
}
