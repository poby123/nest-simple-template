import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AUTHORITY } from 'src/domain/user/entity/enum/authority.enum';
import { CustomException } from '../error/custom-exception.error';
import { NOT_AUTHORIZED } from '../error/res-code.error';

export const SignedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const SignedAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (request.user?.authority !== AUTHORITY.ROLE_ADMIN) {
      throw new CustomException(NOT_AUTHORIZED);
    }
    return request.user;
  },
);
