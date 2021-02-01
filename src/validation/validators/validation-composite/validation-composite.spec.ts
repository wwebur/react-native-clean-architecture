import {FieldValidationSpy} from '@/validation/test';
import {ValidationComposite} from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldValidationSpies: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidationSpies = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field'),
  ];
  const sut = new ValidationComposite(fieldValidationSpies);
  return {
    sut,
    fieldValidationSpies,
  };
};

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const {sut, fieldValidationSpies} = makeSut();
    fieldValidationSpies[0].error = new Error('any_error_message1');
    fieldValidationSpies[1].error = new Error('any_error_message2');
    const errors = sut.validate({any_field: 'any_value'});
    expect(errors).toEqual({
      any_field: 'any_error_message1',
    });
  });
});
