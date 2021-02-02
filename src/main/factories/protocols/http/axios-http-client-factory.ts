import {AxiosHttpClient} from '@/infra/http/axios-http-client/axios-http-client';

export const MakeAxiosHttpClient = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};
