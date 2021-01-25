import {ErrorsI18n, translate} from '@/locale';

export class UnexpectedError extends Error {
  constructor() {
    super(translate(ErrorsI18n.unexpectedError));
    this.name = 'UnexpectedError';
  }
}
