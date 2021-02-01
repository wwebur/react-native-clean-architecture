import {MinLengthError} from '@/validation/errors';
import faker from 'faker';
import {MinLengthValidation} from './min-length-validation';

const makeSut = (fieldName: string, minLength: number): MinLengthValidation =>
  new MinLengthValidation(fieldName, minLength);

describe('MinLengthValidation', () => {
  test('Should return MinLengthError if string length is under the required length', () => {
    const requiredLength = 5;
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName, requiredLength);
    const error = sut.validate(faker.lorem.word(3));
    expect(error).toEqual(new MinLengthError(fieldName, requiredLength));
  });

  test('Should return null if string is valid', () => {
    const requiredLength = 5;
    const fieldName = faker.database.column();
    const sut = makeSut(fieldName, requiredLength);
    const error = sut.validate(faker.lorem.word(5));
    expect(error).toBeNull();
  });
});
