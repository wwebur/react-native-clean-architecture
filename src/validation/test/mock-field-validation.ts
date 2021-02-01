import {FieldValidation} from '../protocols';

export class FieldValidationSpy implements FieldValidation {
  error: Error = null;
  value: string;
  constructor(readonly field: string) {}
  validate(value: string): Error {
    this.value = value;
    return this.error;
  }
}
