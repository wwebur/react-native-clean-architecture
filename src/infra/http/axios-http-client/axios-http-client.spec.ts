import {HttpPostParams} from '@/data/protocols/http';
import axios from 'axios';
import faker from 'faker';
import {AxiosHttpClient} from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  status: faker.random.number(),
  data: faker.random.objectElement(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values(URL, verb, body)', () => {
    const sut = makeSut();
    const request = mockPostRequest();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return correct status code and data', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      data: mockedAxiosResult.data,
    });
  });
});
