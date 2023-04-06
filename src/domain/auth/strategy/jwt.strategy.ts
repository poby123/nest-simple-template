import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';
import { CustomException } from 'src/global/error/custom-exception.error';
import { EXPIRED_JWT, INVALID_JWT } from 'src/global/error/res-code.error';
import { JwtUtils } from '../utils/jwt.utils';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtUtils: JwtUtils) {
    super();
  }

  async validate(req: Request) {
    try {
      const token = await this.jwtUtils.extractToken(req);
      const user = await this.jwtUtils.verifyAccessToken(token);
      return user;
    } catch (e) {
      if (e?.message === 'jwt expired') {
        throw new CustomException(EXPIRED_JWT);
      }
      throw new CustomException(INVALID_JWT);
    }
  }
}
