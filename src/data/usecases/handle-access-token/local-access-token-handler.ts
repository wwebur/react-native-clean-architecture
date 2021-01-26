import {Storage} from '@/data/protocols/storage/storage';
import {StorageClearError} from '@/domain/errors/storage-clear-error';
import {StorageGetError} from '@/domain/errors/storage-get-error';
import {StorageSetError} from '@/domain/errors/storage-set-error';
import {HandleAccessToken} from '@/domain/usecases';

export class LocalAccessTokenHandler implements HandleAccessToken {
  constructor(private readonly storage: Storage<string>) {}
  async save(accessToken: string): Promise<void> {
    try {
      await this.storage.set('accessToken', accessToken);
    } catch (error) {
      throw new StorageSetError();
    }
  }
  async load(): Promise<string> {
    try {
      const value = await this.storage.get('accessToken');
      return value;
    } catch (error) {
      throw new StorageGetError();
    }
  }
  async erase(): Promise<void> {
    try {
      const value = await this.storage.clear('accessToken');
      return value;
    } catch (error) {
      throw new StorageClearError();
    }
  }
}
