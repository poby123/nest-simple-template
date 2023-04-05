import { ValidationError } from '@nestjs/common';

class FieldError {
  field: string;
  value: string | number;
  reason: string;

  constructor(field: string, value: string | number, reason: string) {
    this.field = field;
    this.value = value;
    this.reason = reason;
  }

  static of(error: ValidationError): FieldError {
    const { property, value, constraints } = error;
    const reason = Object.values(constraints)[0];
    return new FieldError(property, value, reason);
  }
}

export { FieldError };
