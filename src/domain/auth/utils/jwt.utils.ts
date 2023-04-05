import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_EXPIRES_TIME, KEY, TOKEN_TYPE } from '../constants';

@Injectable()
export class JwtUtils {
  constructor(private readonly jwtService: JwtService) {}

  async createAccessToken(payload) {
    const token: string = await this.jwtService.signAsync(payload, {
      secret: KEY,
      expiresIn: ACCESS_TOKEN_EXPIRES_TIME,
      algorithm: 'HS512',
    });

    const accessToken = `${TOKEN_TYPE} ${token}`;
    return accessToken;
  }
}
