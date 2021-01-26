import {ErrorsI18n, translate} from '@/locale';

export class StorageSetError extends Error {
  constructor() {
    super(translate(ErrorsI18n.storageSetError));
    this.name = 'StoraStorageSetErrorgeGetError';
  }
}
