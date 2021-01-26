import {StorageMock} from '@/data/test/mock-storage';
import faker from 'faker';
import {LocalSaveAccessToken} from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  storageMock: StorageMock;
};

const makeSut = (): SutTypes => {
  const storageMock = new StorageMock();
  const sut = new LocalSaveAccessToken(storageMock);
  return {
    sut,
    storageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  test('Should call Storage with correct values on set', async () => {
    const {sut, storageMock: storageMock} = makeSut();
    const fakeAccessToken = faker.random.uuid();
    await sut.save(fakeAccessToken);
    expect(storageMock.key).toBe('accessToken');
    expect(storageMock.value).toBe(fakeAccessToken);
  });
  test('Should return StorageSetError when failed to set information with AsyncStorage', () => {
    // const {sut} = makeSut();
    // const storageObject = makeRandomData();
    // mockAsyncStorage.setItem = jest.fn((_key, _value) => {
    //   return Promise.reject();
    // });
    // const promise = sut.set(storageObject.key, storageObject.value);
    // expect(promise).rejects.toThrow(new StorageSetError());
  });
  test('Should call AsyncStorage to retrieve information with correct values', async () => {
    // const {sut} = makeSut();
    // const storageObject = makeRandomData();
    // await sut.get(storageObject.key);
    // expect(AsyncStorage.getItem).toBeCalledWith(storageObject.key);
  });
  test('Should return StorageGetError when failed to get information with AsyncStorage', () => {});
  test('Should call AsyncStorage to clear storage', () => {});
  test('Should return StorageClearError when failed to clear information with AsyncStorage', () => {});
});
