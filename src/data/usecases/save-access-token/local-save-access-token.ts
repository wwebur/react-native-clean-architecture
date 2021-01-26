import {Storage} from '@/data/protocols/storage/storage';
import {SaveAccessToken} from '@/domain/usecases';

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor(private readonly storage: Storage) {}
  async save(accessToken: string): Promise<void> {
    await this.storage.set('accessToken', accessToken);
  }
}
