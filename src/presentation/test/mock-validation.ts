import {Validation} from '@/validation/protocols';

export class ValidationSpy implements Validation {
  errors: void | object = {};
  values: object;

  validate(values: object): void | object {
    this.values = values;
    return this.errors;
  }
}
