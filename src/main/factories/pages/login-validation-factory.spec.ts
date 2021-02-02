import {ValidationBuilder} from '@/validation/builder/validation-builder';
import {ValidationComposite} from '@/validation/validators';
import {MakeLoginValidation} from './login-validation-factory';

describe('MakeLoginValidation', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = MakeLoginValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build(),
      ]),
    );
  });
});
