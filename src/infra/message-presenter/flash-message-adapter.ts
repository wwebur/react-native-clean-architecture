import {MessagePresenter} from '@/data/protocols/message-presenter/message-presenter';
import {UnexpectedError} from '@/domain/errors';
import {Message, MessageOptions} from '@/domain/models';
import {showMessage} from 'react-native-flash-message';

export class FlashMessageAdapter implements MessagePresenter {
  async show(message: Message, options?: MessageOptions): Promise<void> {
    try {
      showMessage({
        message: message.title,
        description: message.description,
        floating: options?.appearance === 'default' ? false : true,
        type: options?.type,
      });
    } catch (error) {
      throw new UnexpectedError();
    }
  }
}
