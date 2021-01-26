import {ErrorsI18n, translate} from '@/locale';

export class StorageGetError extends Error {
  constructor() {
    super(translate(ErrorsI18n.storageGetError));
    this.name = 'StorageGetError';
  }
}
