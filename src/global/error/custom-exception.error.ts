import { HttpException } from '@nestjs/common';
import { ErrorResponse } from './type.error';
import { FieldError } from './field.error';

class CustomException extends HttpException {
  error: ErrorResponse;

  constructor(error: ErrorResponse, errors?: Array<FieldError>) {
    error.errors = errors || [];
    super(error, error.status);

    this.error = error;
    this.error.errors = errors;
  }
}

export { CustomException };
