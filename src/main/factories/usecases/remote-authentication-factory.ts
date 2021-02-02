import {RemoteAuthentication} from '@/data/usecases/authentication/remote-authentication';
import {Authentication} from '@/domain/usecases';
import {MakeApiURL} from '../protocols/http/api-url-factory';
import {MakeAxiosHttpClient} from '../protocols/http/axios-http-client-factory';

export const MakeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(MakeApiURL('/login'), MakeAxiosHttpClient());
};
