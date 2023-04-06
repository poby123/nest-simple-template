import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomException } from 'src/global/error/custom-exception.error';
import { INVALID_JWT } from 'src/global/error/res-code.error';
import {
  ACCESS_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_TYPE,
  KEY,
  PAYLOAD_ACCESS_TOKEN_TYPE,
  PREFIX_TOKEN_TYPE,
} from '../constants';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(user: any) {
    const payload = {
      sub: PAYLOAD_ACCESS_TOKEN_TYPE,
      id: user.id,
      type: ACCESS_TOKEN_TYPE,
    };
    const token: string = await this.jwtService.signAsync(payload, {
      secret: KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_TIME,
      algorithm: 'HS512',
    });

    const accessToken = `${ACCESS_TOKEN_TYPE} ${token}`;
    return accessToken;
  }

  async extractToken(req: Request) {
    const token = req.headers['authorization']?.slice(PREFIX_TOKEN_TYPE.length);

    if (!token) {
      throw new CustomException(INVALID_JWT);
    }

    return token;
  }

  /**
   *
   * @param token
   * @returns
   */
  async verifyAccessToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: KEY,
      ignoreExpiration: false,
    });

    if (payload?.sub !== PAYLOAD_ACCESS_TOKEN_TYPE) {
      throw new CustomException(INVALID_JWT);
    }
    if (payload?.type != ACCESS_TOKEN_TYPE) {
      throw new CustomException(INVALID_JWT);
    }

    return payload;
  }
}
