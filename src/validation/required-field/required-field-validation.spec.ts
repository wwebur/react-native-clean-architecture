import faker from 'faker';
import {RequiredFieldError} from '../errors';
import {RequiredFieldValidation} from './required-field-validation';

type FakeFormValues = {
  name?: string;
};

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });
  test('Should return null if field is not empty', () => {
    const sut = new RequiredFieldValidation('email');
    const error = sut.validate(faker.internet.email());
    expect(error).toBeNull();
  });
});
