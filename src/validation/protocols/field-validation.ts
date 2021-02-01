export interface FieldValidation {
  field: string;
  precedence: number;
  validate(value: string): Error;
}
