import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { SigninRequestDto } from 'src/domain/user/dto/siginin-req.dto';
import { User } from 'src/domain/user/entity/user.entity';
import { UserService } from 'src/domain/user/service/user.service';
import { CustomException } from 'src/global/error/custom-exception.error';
import { INCORRECT_PASSWORD } from 'src/global/error/res-code.error';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtUtils: JwtUtils,
  ) {}

  async signIn(signinDto: SigninRequestDto) {
    const { email, password } = signinDto;
    const user: User = await this.userService.getUserByEmail(email);

    if (!(await compare(password, user.password))) {
      throw new CustomException(INCORRECT_PASSWORD);
    }

    const payload = { email: email, sub: user.id };
    return {
      accessToken: await this.jwtUtils.createAccessToken(payload),
    };
  }
}
