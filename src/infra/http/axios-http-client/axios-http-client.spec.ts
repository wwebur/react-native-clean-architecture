import {mockPostRequest} from '@/data/test';
import {mockAxios, mockHttpResponse} from '@/infra/test';
import axios from 'axios';
import {AxiosHttpClient} from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct values(URL, verb, body)', () => {
    const {sut, mockedAxios} = makeSut();
    const request = mockPostRequest();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return correct status code and data', async () => {
    const {sut, mockedAxios} = makeSut();
    const promiseValue = await sut.post(mockPostRequest());
    const expectedValue = await mockedAxios.post.mock.results[1].value;

    expect(promiseValue.data).toEqual(expectedValue.data);
    expect(promiseValue.statusCode).toEqual(expectedValue.status);
  });

  test('Should return correct status code and data on failure', async () => {
    const {sut, mockedAxios} = makeSut();
    const httpResponse = mockHttpResponse();
    mockedAxios.post.mockRejectedValueOnce({
      response: httpResponse,
    });
    const promiseValue = await sut.post(mockPostRequest());

    expect(promiseValue.data).toEqual(httpResponse.data);
    expect(promiseValue.statusCode).toEqual(httpResponse.status);
  });
});
