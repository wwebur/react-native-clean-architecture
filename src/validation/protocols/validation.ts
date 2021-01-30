export interface Validation<T> {
  validate: (values: T) => void | T;
}
