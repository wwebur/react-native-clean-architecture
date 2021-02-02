import {Message} from '@/domain/models';

export interface MessagePresenter {
  show(message: Message): Promise<void>;
}
