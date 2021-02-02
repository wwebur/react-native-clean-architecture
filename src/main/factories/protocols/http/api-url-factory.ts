import {ApiConfig} from '@/config/api-config';
import {ApiScope} from '@/data/protocols/http';

export const MakeApiURL = (scope?: ApiScope): string => {
  return `${ApiConfig.baseURL}/${scope}`;
};
