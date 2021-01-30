import {InvalidFieldError} from '@/validation/errors';
import {FieldValidation} from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    console.log(value);
    return new InvalidFieldError('email');
  }
}
