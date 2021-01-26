import {Storage} from '../protocols/storage/storage';

export class StorageMock implements Storage<string> {
  key: string;
  value: any;
  async set(key: string, value: string): Promise<void> {
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
  async get(key: string): Promise<string> {
    this.key = key;
    return Promise.resolve('');
  }
  async clear(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
