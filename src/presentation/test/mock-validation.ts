import {LoginFormValues} from '@/presentation/types';
import {Validation} from '@/validation/protocols';

export class ValidationSpy implements Validation<LoginFormValues> {
  errors: void | LoginFormValues = {};
  values: LoginFormValues;

  validate(values: LoginFormValues): void | LoginFormValues {
    this.values = values;
    return this.errors;
  }
}
