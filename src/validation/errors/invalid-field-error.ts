import {ErrorsI18n, translate} from '@/locale';

export class InvalidFieldError extends Error {
  constructor(fieldName: 'email' | 'other' = 'other') {
    let message = translate(ErrorsI18n.invalidOtherFieldError);
    if (fieldName === 'email') {
      message = translate(ErrorsI18n.invalidEmailFieldError);
    }
    super(message);
    this.name = 'InvalidFieldError';
  }
}
