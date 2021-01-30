import faker from 'faker';
import {RequiredFieldError} from '../../errors';
import {RequiredFieldValidation} from './required-field-validation';

type FakeFormValues = {
  name?: string;
};

const makeSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });
  test('Should return null if field is not empty', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toBeNull();
  });
});
