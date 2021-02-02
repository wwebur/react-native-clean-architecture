import {Message} from '@/domain/models';
import {MessagePresenter} from '../protocols/message-presenter/message-presenter';

export class MessagePresenterSpy implements MessagePresenter {
  message: Message;
  async show(message: Message): Promise<void> {
    this.message = message;
  }
}
