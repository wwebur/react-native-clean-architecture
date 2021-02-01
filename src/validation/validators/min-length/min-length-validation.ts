import {MinLengthError} from '@/validation/errors';
import {FieldValidation} from '@/validation/protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}
  validate(value: string): Error {
    if (value.length < this.minLength) {
      return new MinLengthError(this.field, this.minLength);
    }
    return null;
  }
}
