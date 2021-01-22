import {Validation} from '@/presentation/protocols/validation';
import {LoginFormValues} from '@/presentation/types';

export class ValidationSpy implements Validation<LoginFormValues> {
  errors: void | LoginFormValues = {};
  values: LoginFormValues;

  validate(values: LoginFormValues): void | LoginFormValues {
    this.values = values;
    return this.errors;
  }
}
