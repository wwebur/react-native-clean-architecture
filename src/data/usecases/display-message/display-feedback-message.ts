import {MessagePresenter} from '@/data/protocols/message-presenter/message-presenter';
import {Message, MessageOptions} from '@/domain/models';
import {DisplayMessage} from '@/domain/usecases/display-message';

export class DisplayFeedbackMessage implements DisplayMessage {
  constructor(private readonly messagePresenter: MessagePresenter) {}
  async show(
    message: Message,
    options: MessageOptions = {appearance: 'floating', type: 'default'},
  ): Promise<void> {
    try {
      await this.messagePresenter.show(message, options);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
