import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from '../entity/user.entity';

export class UserSignupRequestDto {

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public password: string;

  @IsEmail()
  public email: string;

  static toEntity(userSignupDto: UserSignupRequestDto): User {
    return new User(
      userSignupDto.name,
      userSignupDto.email,
      userSignupDto.password,
    );
  }
}
