import {InvalidFieldError} from '@/validation/errors';
import {FieldValidation} from '@/validation/protocols';

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(value: string): Error {
    if (value) {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value) ? null : new InvalidFieldError('email');
    }
    return null;
  }
}
