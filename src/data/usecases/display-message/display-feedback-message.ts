import {MessagePresenter} from '@/data/protocols/message-presenter/message-presenter';
import {Message} from '@/domain/models';
import {DisplayMessage} from '@/domain/usecases/display-message';

export class DisplayFeedbackMessage implements DisplayMessage {
  constructor(private readonly messagePresenter: MessagePresenter) {}
  async show(message: Message): Promise<void> {
    try {
      await this.messagePresenter.show(message);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
