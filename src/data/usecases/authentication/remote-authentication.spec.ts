import faker from 'faker';
import {HttpPostClientSpy} from '../../test/mock-http-client';
import {RemoteAuthentication} from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {sut, httpPostClientSpy};
};

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct url', () => {
    const url = faker.internet.url();
    const {sut, httpPostClientSpy} = makeSut(url);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
