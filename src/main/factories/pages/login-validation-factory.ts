import {ValidationBuilder} from '@/validation/builder/validation-builder';
import {Validation} from '@/validation/protocols';
import {ValidationComposite} from '@/validation/validators';

export const MakeLoginValidation = (): Validation => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
  ]);
};
