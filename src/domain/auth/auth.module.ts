import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ACCESS_TOKEN_EXPIRES_TIME, KEY } from './constants';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtUtils } from './utils/jwt.utils';
import { AccessTokenStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, JwtUtils, AccessTokenStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
