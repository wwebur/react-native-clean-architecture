import faker from 'faker';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '../validators';
import {ValidationBuilder as sut} from './validation-builder';

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).required().build();
    expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
  });

  test('Should return EmailValidation', () => {
    const fieldName = faker.database.column();
    const validations = sut.field(fieldName).email().build();
    expect(validations).toEqual([new EmailValidation(fieldName)]);
  });

  test('Should return MinLengthValidation', () => {
    const fieldName = faker.database.column();
    const minLength = faker.random.number(10);
    const validations = sut.field(fieldName).min(minLength).build();
    expect(validations).toEqual([
      new MinLengthValidation(fieldName, minLength),
    ]);
  });

  test('Should return correct list of validations', () => {
    const fieldName = faker.database.column();
    const minLength = faker.random.number(10);
    const validations = sut
      .field(fieldName)
      .required()
      .min(minLength)
      .email()
      .build();
    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new EmailValidation(fieldName),
    ]);
  });
});
