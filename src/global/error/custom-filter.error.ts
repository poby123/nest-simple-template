import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomException } from './custom-exception.error';
import { ErrorResponse } from './type.error';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: CustomException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody = exception.error;
    const httpStatus = responseBody.status;
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody = new ErrorResponse();
    responseBody.status = exception.getStatus();
    responseBody.message = exception.message;

    httpAdapter.reply(ctx.getResponse(), responseBody, exception.getStatus());
  }
}
