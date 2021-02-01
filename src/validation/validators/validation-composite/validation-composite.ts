import {FieldValidation, Validation} from '@/validation/protocols';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(values: object): void | object {
    const errors = {};
    for (const fieldName in values) {
      const fieldValue = values[fieldName];
      const givenFieldValidators = this.validators.filter(
        (v) => v.field === fieldName,
      );
      for (let index = 0; index < givenFieldValidators.length; index++) {
        const validator = givenFieldValidators[index];
        const errorMessage = validator.validate(fieldValue);
        if (errorMessage) {
          errors[fieldName] = errorMessage.message;
          break;
        }
      }
    }
    return errors;
  }
}
