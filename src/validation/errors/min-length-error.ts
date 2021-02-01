import {ErrorsI18n, translateAndReplaceWithArray} from '@/locale';

export class MinLengthError extends Error {
  constructor(fieldName: string, requiredLength: number) {
    super(
      translateAndReplaceWithArray(ErrorsI18n.minLengthError, [
        fieldName,
        requiredLength.toString(),
      ]),
    );
    this.name = 'MinLengthError';
  }
}
