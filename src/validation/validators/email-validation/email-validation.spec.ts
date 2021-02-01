import {InvalidFieldError} from '@/validation/errors/invalid-field-error';
import faker from 'faker';
import {EmailValidation} from './email-validation';

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.database.column());

describe('EmailValidation', () => {
  test('Should return InvalidEmailError if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError('email'));
  });

  test('Should return null if email if valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());
    expect(error).toBeNull();
  });
});
