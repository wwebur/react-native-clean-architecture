import {Message, MessageOptions} from '@/domain/models';
export interface MessagePresenter {
  show(message: Message, options?: MessageOptions): Promise<void>;
}
