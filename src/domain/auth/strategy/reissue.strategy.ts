import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { CustomException } from 'src/global/error/custom-exception.error';
import {
  EXPIRED_JWT,
  INVALID_JWT,
  NOT_EXPIRED_JWT,
} from 'src/global/error/res-code.error';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable()
export class ReissueStrategy extends PassportStrategy(Strategy, 'reissue') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  /**
   * 사용자가 만료된 accessToken을 가지고 있는지 검증하고, 그렇지 않은 경우에 대해서는 예외를 발생시킨다.
   * @param req
   * @returns
   */
  async validate(req: Request) {
    let user = null;

    try {
      const token = await this.jwtUtils.extractAccessToken(req);
      user = await this.jwtUtils.verifyAccessToken(token);
      // throw new CustomException(NOT_EXPIRED_JWT);
    } catch (e) {
      if (e?.message !== 'jwt expired' || !user) {
        throw new CustomException(INVALID_JWT);
      }
    }

    const refreshToken = await this.jwtUtils.extractRefreshToken(req);
    return await this.jwtUtils.verifyRefreshToken(user, refreshToken);
  }
}
