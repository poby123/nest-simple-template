import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CustomException } from 'src/global/error/custom-exception.error';
import { INVALID_JWT } from 'src/global/error/res-code.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  // For excluding guard to @IsPublic decorator
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // handleRequest<TUser = any>(
  //   err: any,
  //   user: any,
  //   info: any,
  //   context: ExecutionContext,
  //   status?: any,
  // ): TUser {

  //   if (err || !user) {
  //     throw new CustomException(INVALID_JWT);
  //   }
  //   return user;
  // }
}
