import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { ACCESS_TOKEN_EXPIRES_TIME } from './constants';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AccessTokenStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { ReissueStrategy } from './strategy/reissue.strategy';
import { JwtUtils } from './utils/jwt.utils';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRES_TIME },
    }),
  ],
  providers: [
    AuthService,
    JwtUtils,
    AccessTokenStrategy,
    LocalStrategy,
    ReissueStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
