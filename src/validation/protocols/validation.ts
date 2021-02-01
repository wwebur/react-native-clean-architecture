export interface Validation {
  validate: (values: object) => void | object;
}
