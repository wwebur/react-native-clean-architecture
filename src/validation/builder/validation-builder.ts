import {FieldValidation} from '../protocols';
import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from '../validators';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(minLength: number): ValidationBuilder {
    this.validations.push(new MinLengthValidation(this.fieldName, minLength));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
