import {Storage} from '@/data/protocols/storage/storage';
import {StorageSetError} from '@/domain/errors/storage-set-error';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageAdapter implements Storage<string> {
  async set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new StorageSetError();
    }
  }
  async get(key: string): Promise<string> {
    const value = await AsyncStorage.getItem(key);
    return Promise.resolve(value);
  }
  async clear(key: string): Promise<void> {
    console.log(key);
  }
}
