import {ErrorsI18n, translate} from '@/locale';

export class InvalidCredentialsError extends Error {
  constructor() {
    super(translate(ErrorsI18n.invalidCredentialsError));
    this.name = 'InvalidCredentialsError';
  }
}
