import {StorageMock} from '@/data/test/mock-storage';
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
  test('Should throw Error when Storage throws Error on set', async () => {
    const {sut, storageMock} = makeSut();
    jest.spyOn(storageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(faker.random.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });
  test('Should call Storage with correct values on get', async () => {
    const {sut, storageMock} = makeSut();
    const fakeAccessToken = faker.random.uuid();
    jest.spyOn(storageMock, 'get').mockResolvedValueOnce(fakeAccessToken);
    const promise = sut.load();
    await expect(promise).resolves.toBe(fakeAccessToken);
  });
  test('Should throw Error when Storage throws Error on get', async () => {
    const {sut, storageMock} = makeSut();
    jest.spyOn(storageMock, 'get').mockRejectedValueOnce(new Error());
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new Error());
  });
  test('Should call Storage clear on erase with correct key', async () => {
    const {sut, storageMock} = makeSut();
    const clearWatch = jest.spyOn(storageMock, 'clear');
    await sut.erase();
    expect(storageMock.key).toBe('accessToken');
    expect(clearWatch).toHaveBeenCalled();
  });
  test('Should return Error when Storage throws Error on clear', async () => {
    const {sut, storageMock} = makeSut();
    jest.spyOn(storageMock, 'clear').mockRejectedValueOnce(new Error());
    const promise = sut.erase();
    await expect(promise).rejects.toThrow(new Error());
  });
});
