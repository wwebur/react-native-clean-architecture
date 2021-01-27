import {HandleAccessToken} from '@/domain/usecases';

export class HandleAccessTokenMock implements HandleAccessToken {
  accessToken: string;
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
  async load(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async erase(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
