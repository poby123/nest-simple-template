import { FieldError } from './field.error';

export interface ErrorResponseType {
  status: number;
  code: string;
  message: string;
  errors?: Array<FieldError>;
}
