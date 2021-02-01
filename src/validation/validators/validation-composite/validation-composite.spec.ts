import {FieldValidationSpy} from '@/validation/test';
import {ValidationComposite} from './validation-composite';

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('email');
    fieldValidationSpy1.error = new Error('any_error_message1');

    const fieldValidationSpy2 = new FieldValidationSpy('email');
    fieldValidationSpy2.error = new Error('any_error_message2');

    const fieldValidationSpy3 = new FieldValidationSpy('password');
    fieldValidationSpy3.error = new Error('any_error_message3');

    const sut = new ValidationComposite([
      fieldValidationSpy1,
      fieldValidationSpy2,
      fieldValidationSpy3,
    ]);
    const errors = sut.validate({email: 'any_value', password: 'any_value'});
    expect(errors).toEqual({
      email: 'any_error_message2',
      password: 'any_error_message3',
    });
  });
});
