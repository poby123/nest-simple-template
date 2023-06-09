import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ReissueAuthGuard extends AuthGuard('reissue') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
}
