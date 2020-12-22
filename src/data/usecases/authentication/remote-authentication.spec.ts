import {HttpPostClient} from '../../protocols/http/http-post-client';
import {RemoteAuthentication} from './remote-authentication';

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct url', () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = '/any';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
