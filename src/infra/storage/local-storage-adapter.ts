import {Storage} from '@/data/protocols/storage/storage';
import {
  StorageClearError,
  StorageGetError,
  StorageSetError,
} from '@/domain/errors';
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
    try {
      const value = await AsyncStorage.getItem(key);
      return Promise.resolve(value);
    } catch (error) {
      throw new StorageGetError();
    }
  }
  async clear(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new StorageClearError();
    }
  }
}
