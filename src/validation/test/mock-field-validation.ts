import {FieldValidation} from '../protocols';

export class FieldValidationSpy implements FieldValidation {
  error: Error = null;
  value: string;
  constructor(readonly field: string, readonly precedence: number = 1) {}
  validate(value: string): Error {
    this.value = value;
    return this.error;
  }
}
