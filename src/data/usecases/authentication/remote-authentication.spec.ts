import {HttpPostClientSpy} from '../../test/mock-http-client';
import {RemoteAuthentication} from './remote-authentication';

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct url', () => {
    const url = '/any';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
