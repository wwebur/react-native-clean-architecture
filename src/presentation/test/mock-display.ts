import {Message, MessageOptions} from '@/domain/models';
import {DisplayMessage} from '@/domain/usecases/display-message';

export class DisplaySpy implements DisplayMessage {
  message: Message;
  options?: MessageOptions;
  async show(message: Message, options?: MessageOptions): Promise<void> {
    this.message = message;
    this.options = options;
  }
}
