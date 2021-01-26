import {Storage} from '@/data/protocols/storage/storage';
import {HandleAccessToken} from '@/domain/usecases';

export class LocalAccessTokenHandler implements HandleAccessToken {
  constructor(private readonly storage: Storage<string>) {}
  async save(accessToken: string): Promise<void> {
    await this.storage.set('accessToken', accessToken);
  }
  async load(): Promise<string> {
    const value = await this.storage.get('accessToken');
    return value;
  }
  async erase(): Promise<void> {
    const value = await this.storage.clear('accessToken');
    return value;
  }
}
