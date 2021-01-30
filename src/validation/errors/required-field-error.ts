import {ErrorsI18n, translate} from '@/locale';

export class RequiredFieldError extends Error {
  constructor() {
    super(translate(ErrorsI18n.requiredFieldError));
    this.name = 'RequiredFieldError';
  }
}
