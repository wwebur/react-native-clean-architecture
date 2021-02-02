import {Storage} from '@/data/protocols/storage/storage';
import {LocalStorageAdapter} from '@/infra/storage/local-storage-adapter';

export const MakeStorage = (): Storage<string> => {
  return new LocalStorageAdapter();
};
