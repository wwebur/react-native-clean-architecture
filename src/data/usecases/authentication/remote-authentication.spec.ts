import {HttpStatusCode} from '@/data/protocols/http/http-response';
import {HttpPostClientSpy} from '@/data/test/mock-http-client';
import {InvalidCredentialsError} from '@/domain/errors/invalid-credentials-error';
import {mockAuthentication} from '@/domain/test/mock-authentication';
import faker from 'faker';
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
    sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', () => {
    const {sut, httpPostClientSpy} = makeSut();
    const authenticationParams = mockAuthentication();
    sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', () => {
    const {sut, httpPostClientSpy} = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };

    const promise = sut.auth(mockAuthentication());
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
