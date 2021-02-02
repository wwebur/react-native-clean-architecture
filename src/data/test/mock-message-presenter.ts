import {Message, MessageOptions} from '@/domain/models';
import {MessagePresenter} from '../protocols/message-presenter/message-presenter';

export class MessagePresenterSpy implements MessagePresenter {
  message: Message;
  options: MessageOptions;
  async show(message: Message, options?: MessageOptions): Promise<void> {
    this.message = message;
    this.options = options;
  }
}
