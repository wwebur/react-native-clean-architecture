import {FieldValidation, Validation} from '@/validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {
    this.validators = validators.sort((a, b) => {
      if (a.precedence === b.precedence) {
        return;
      }
      if (a.precedence > b.precedence) {
        return 1;
      } else {
        return -1;
      }
    });
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
        }
      }
    }
    return errors;
  }
}
