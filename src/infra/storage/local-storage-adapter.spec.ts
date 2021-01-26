import AsyncStorage from '@react-native-async-storage/async-storage';
import faker from 'faker';
import {LocalStorageAdapter} from './local-storage-adapter';

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('Should call AsyncStorage with correct values', async () => {
    const sut = new LocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.random.word();
    await sut.set(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
