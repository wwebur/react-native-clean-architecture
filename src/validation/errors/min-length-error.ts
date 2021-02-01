export class MinLengthError extends Error {
  constructor(fieldName: string, requiredLength: number) {
    super(`${fieldName} must be at least ${requiredLength} characters`);
    this.name = 'MinLengthError';
  }
}
