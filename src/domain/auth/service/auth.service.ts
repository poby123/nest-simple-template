import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) { }

  async signIn(user: any) {
    const accessToken = await this.jwtUtils.createAccessToken(user);
    const refreshToken = await this.jwtUtils.createRefreshToken();
    await this.jwtUtils.saveRefreshToken(user, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signOut(user: any) {
    await this.cacheManager.del(user.id);
  }

  async reissue(user: any) {
    return await this.signIn(user);
  }

  async validate(email: string, plainPassword: string) {
    const user: User = await this.userService.getUserByEmail(email);

    if (!(await compare(plainPassword, user.password))) {
      throw new CustomException(INCORRECT_PASSWORD);
    }

    const { password, ...result } = user;

    return result;
  }
}
