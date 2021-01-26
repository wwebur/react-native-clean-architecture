import {ErrorsI18n, translate} from '@/locale';

export class StorageClearError extends Error {
  constructor() {
    super(translate(ErrorsI18n.storageClearError));
    this.name = 'StorageClearError';
  }
}
