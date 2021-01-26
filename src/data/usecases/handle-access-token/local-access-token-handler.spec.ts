import {StorageMock} from '@/data/test/mock-storage';
import {StorageGetError} from '@/domain/errors/storage-get-error';
import {StorageSetError} from '@/domain/errors/storage-set-error';
import faker from 'faker';
import {LocalAccessTokenHandler} from './local-access-token-handler';

type SutTypes = {
  sut: LocalAccessTokenHandler;
  storageMock: StorageMock;
};

const makeSut = (): SutTypes => {
  const storageMock = new StorageMock();
  const sut = new LocalAccessTokenHandler(storageMock);
  return {
    sut,
    storageMock,
  };
};

describe('LocalAccessTokenHandler', () => {
  test('Should call Storage with correct values on set', async () => {
    const {sut, storageMock} = makeSut();
    const fakeAccessToken = faker.random.uuid();
    await sut.save(fakeAccessToken);
    expect(storageMock.key).toBe('accessToken');
    expect(storageMock.value).toBe(fakeAccessToken);
  });
  test('Should throw StorageSetError when Storage throws error on set', async () => {
    const {sut, storageMock} = makeSut();
    jest.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new StorageSetError());
  });
  test('Should call Storage with correct values on get', async () => {
    const {sut, storageMock} = makeSut();
    const fakeAccessToken = faker.random.uuid();
    jest.spyOn(storageMock, 'get').mockResolvedValueOnce(fakeAccessToken);
    const promise = sut.load();
    await expect(promise).resolves.toBe(fakeAccessToken);
  });
  test('Should throw StorageGetError when Storage throws error on get', async () => {
    const {sut, storageMock} = makeSut();
    jest.spyOn(storageMock, 'get').mockRejectedValueOnce(new Error());
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new StorageGetError());
  });
  test('Should call AsyncStorage to clear storage', () => {});
  test('Should return StorageClearError when failed to clear information with AsyncStorage', () => {});
});
