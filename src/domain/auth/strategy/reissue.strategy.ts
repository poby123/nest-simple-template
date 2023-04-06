import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable()
export class ReissueStrategy extends PassportStrategy(Strategy, 'reissue') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  /**
   * 사용자가 만료됐거나 유효한 accessToken을 가지고 있는지 검증하고, 그렇지 않은 경우에 대해서는 예외를 발생시킨다.
   * @param req
   * @returns 서비스 이용중에 이용할 사용자(payload) 정보
   */
  async validate(req: Request) {
    const token = await this.jwtUtils.extractAccessToken(req);
    const user = await this.jwtUtils.verifyAccessTokenIgnoreExpiration(token);
    const refreshToken = await this.jwtUtils.extractRefreshToken(req);

    await this.jwtUtils.verifyRefreshToken(user, refreshToken);
    return user;
  }
}
