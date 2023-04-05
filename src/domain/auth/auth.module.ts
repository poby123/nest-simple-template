import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ACCESS_TOKEN_EXPIRES_TIME, KEY } from './constants';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtUtils } from './utils/jwt.utils';
import { AccessTokenStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: KEY,
      signOptions: { expiresIn: ACCESS_TOKEN_EXPIRES_TIME },
    }),
  ],
  providers: [AuthService, JwtUtils, AccessTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
