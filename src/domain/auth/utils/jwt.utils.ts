import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomException } from 'src/global/error/custom-exception.error';
import { INVALID_JWT } from 'src/global/error/res-code.error';
import { Cache } from 'cache-manager';
import {
  ACCESS_TOKEN_EXPIRES_TIME,
  ACCESS_TOKEN_TYPE,
  COOKIE_REFRESH_TOKEN_TYPE,
  KEY,
  PAYLOAD_ACCESS_TOKEN_TYPE,
  PREFIX_ACCESS_TOKEN_TYPE,
  REFRESH_TOKEN_EXPIRES_TIME,
} from '../constants';

@Injectable()
export class JwtUtils {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

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

  async createRefreshToken() {
    const token: string = await this.jwtService.signAsync(
      {},
      {
        secret: KEY,
        expiresIn: REFRESH_TOKEN_EXPIRES_TIME,
        algorithm: 'HS512',
      },
    );

    const refreshToken = `${token}`;
    return refreshToken;
  }

  async extractAccessToken(req: Request) {
    const token = req.headers['authorization']?.slice(
      PREFIX_ACCESS_TOKEN_TYPE.length,
    );

    if (!token) {
      throw new CustomException(INVALID_JWT);
    }

    return token;
  }

  async extractRefreshToken(req: Request) {
    const token = req.cookies[COOKIE_REFRESH_TOKEN_TYPE];

    if (!token) {
      throw new CustomException(INVALID_JWT);
    }

    return token;
  }

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

  /**
   * 저장된 토큰과 주어진 토큰을 비교하여, 같지 않다면 exception을 발생시킨다.
   * @param user
   * @param token
   * @returns
   */
  async verifyRefreshToken(user: any, token: string): Promise<boolean> {
    const savedToken = await this.cacheManager.get(user.id);
    if (savedToken !== token) {
      console.log('invalid refresh token');

      throw new CustomException(INVALID_JWT);
    }
    return true;
  }
}
