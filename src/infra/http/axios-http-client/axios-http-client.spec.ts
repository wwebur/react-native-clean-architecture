import {AxiosHttpClient} from './axios-http-client';
import axios from 'axios';
import faker from 'faker';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct URL', async () => {
    const sut = new AxiosHttpClient();
    const url = faker.internet.url();
    sut.post({url});
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});
