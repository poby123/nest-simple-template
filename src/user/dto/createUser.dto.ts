import { User } from '../entity/user.entity';

export class UserSignupDto {
  name: string;
  password: string;
  email: string;

  static toEntity(userSignupDto): User {
    return new User(
      userSignupDto.name,
      userSignupDto.email,
      userSignupDto.password,
    );
  }
}
