import {HttpPostParams} from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import {AxiosHttpClient} from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct URL and verb', async () => {
    const sut = makeSut();
    const request = mockPostRequest();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
});
