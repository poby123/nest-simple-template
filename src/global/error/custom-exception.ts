import { HttpException } from '@nestjs/common';
import { ErrorResponseType } from './types/response-error.type';
import { FieldError } from './field-error';

class CustomException extends HttpException {
  error: ErrorResponseType;

  constructor(error: ErrorResponseType, errors?: Array<FieldError>) {
    error.errors = errors || [];
    super(error, error.status);

    this.error = error;
    this.error.errors = errors;
  }
}

export { CustomException };
