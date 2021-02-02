import {LocalAccessTokenHandler} from '@/data/usecases/handle-access-token/local-access-token-handler';
import {HandleAccessToken} from '@/domain/usecases';
import {MakeStorage} from '../protocols/storage/storage-factory';

export const MakeHandleAccessToken = (): HandleAccessToken => {
  return new LocalAccessTokenHandler(MakeStorage());
};
