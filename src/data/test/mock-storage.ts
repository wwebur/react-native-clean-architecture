import {Storage} from '../protocols/storage/storage';

export class StorageMock implements Storage<string> {
  key: string;
  value: any;
  async set(key: string, value: string): Promise<void> {
    this.key = key;
    this.value = value;
  }
  async get(key: string): Promise<string> {
    this.key = key;
    return Promise.resolve('');
  }
  async clear(key: string): Promise<void> {
    this.key = key;
  }
}
