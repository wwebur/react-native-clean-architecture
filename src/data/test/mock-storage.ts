import {Storage, StorageValues} from '../protocols/storage/storage';

export class StorageSpy implements Storage {
  key: string;
  value: any;
  async set(key: string, value: StorageValues): Promise<void> {
    this.key = key;
    this.value = value;
    // try {
    //   this.key = key;
    //   this.value = value;
    //   return AsyncStorage.setItem(key, value.toString());
    // } catch (error) {
    //   throw new StorageSetError();
    // }
  }
  async get(key: string): Promise<StorageValues> {
    this.key = key;
    throw new Error('Method not implemented.');
  }
  async clear(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
