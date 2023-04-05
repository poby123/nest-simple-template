import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ErrorCode } from './error-code';
import { CustomException } from './custom-exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    if (exception instanceof CustomException) {
      const responseBody = exception.error;
      const httpStatus = responseBody.status;
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      return;
    }

    const responseBody = ErrorCode.SERVER_ERROR;
    const httpStatus = responseBody.status;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
