import {FieldValidationSpy} from '@/validation/test';
import {ValidationComposite} from './validation-composite';
import faker from 'faker';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpies: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName),
  ];
  const sut = new ValidationComposite(fieldValidationSpies);
  return {
    sut,
    fieldValidationSpies,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const {sut, fieldValidationSpies} = makeSut(fieldName);
    const errorMessage = faker.random.words();
    fieldValidationSpies[0].error = new Error(errorMessage);
    fieldValidationSpies[1].error = new Error(faker.random.words());
    const errors = sut.validate({[fieldName]: faker.random.word()});
    expect(errors).toEqual({
      [fieldName]: errorMessage,
    });
  });

  test('Should return empty errors if pass all validation', () => {
    const fieldName = faker.database.column();
    const {sut} = makeSut(fieldName);
    const errors = sut.validate({[fieldName]: faker.random.word()});
    expect(errors).toEqual({});
  });
});
