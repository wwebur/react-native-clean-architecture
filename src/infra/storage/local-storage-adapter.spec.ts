import {StorageSetError} from '@/domain/errors/storage-set-error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import faker from 'faker';
import {LocalStorageAdapter} from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('Should call AsyncStorage with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();
    await sut.set(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });
  test('Should throw StorageSetError when AsyncStorage throws Error on setItem', async () => {
    const sut = makeSut();
    AsyncStorageMock.setItem = jest.fn(() => {
      return Promise.reject(new Error());
    });
    const promise = sut.set(faker.database.column(), faker.random.word());
    await expect(promise).rejects.toThrow(new StorageSetError());
  });
});
