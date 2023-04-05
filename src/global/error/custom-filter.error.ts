import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomException } from './custom-exception.error';
import { INTERNAL_SERVER_ERROR } from './res-code.error';

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

    const responseBody = INTERNAL_SERVER_ERROR;
    const httpStatus = responseBody.status;

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
