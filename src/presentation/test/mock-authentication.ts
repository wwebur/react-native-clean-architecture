import {AccountModel} from '@/domain/models';
import {mockAccountModel} from '@/domain/test';
import {Authentication, AuthenticationParams} from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  callsCount: number = 0;
  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return Promise.resolve(this.account);
  }
}
