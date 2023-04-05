import {
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FieldError } from '../error/field.error';
import { CustomException } from '../error/custom-exception.error';
import { INVALID_REQUEST } from '../error/res-code.error';

@ValidatorConstraint()
export class TextLengthMore15 implements ValidatorConstraintInterface {
  validate(text: string) {
    return text ? text.length > 15 : false;
  }
}

export const formatErrors = (errors: Array<ValidationError>) => {
  const fieldErrors = errors.map((m) => FieldError.of(m));

  const invalidRequestException = new CustomException(
    INVALID_REQUEST,
    fieldErrors,
  );

  return invalidRequestException;
};
