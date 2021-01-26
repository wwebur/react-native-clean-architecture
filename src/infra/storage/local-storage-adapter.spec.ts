import {
  StorageClearError,
  StorageGetError,
  StorageSetError,
} from '@/domain/errors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import faker from 'faker';
import {LocalStorageAdapter} from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('Should call AsyncStorage with correct values on set', async () => {
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
  test('Should call AsyncStorage on get and return correct value', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();
    AsyncStorageMock.getItem = jest.fn(() => {
      return Promise.resolve(value);
    });
    const result = await sut.get(key);
    expect(result).toBe(value);
  });
  test('Should throw StorageGetError when AsyncStorage throws Error on getItem', async () => {
    const sut = makeSut();
    AsyncStorageMock.getItem = jest.fn(() => {
      return Promise.reject(new Error());
    });
    const promise = sut.get(faker.database.column());
    await expect(promise).rejects.toThrow(new StorageGetError());
  });
  test('Should call AsyncStorage with correct values on clear', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    await sut.clear(key);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });
  test('Should throw StorageClearError when AsyncStorage throws Error on removeItem', async () => {
    const sut = makeSut();
    AsyncStorageMock.removeItem = jest.fn(() => {
      return Promise.reject(new Error());
    });
    const promise = sut.clear(faker.database.column());
    await expect(promise).rejects.toThrow(new StorageClearError());
  });
});
