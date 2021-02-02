import {MessagePresenter} from '@/data/protocols/message-presenter/message-presenter';
import {UnexpectedError} from '@/domain/errors';
import {Message} from '@/domain/models';
import {showMessage} from 'react-native-flash-message';

export class FlashMessageAdapter implements MessagePresenter {
  async show(message: Message): Promise<void> {
    try {
      showMessage({
        message: message.title,
        description: message.description,
      });
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
