import { FieldError } from './field.error';

export class ErrorResponse {
  status: number;
  code: string;
  message: string;
  errors?: Array<FieldError>;
}
