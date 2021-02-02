import {Message, MessageOptions} from '../models';

export interface DisplayMessage {
  show(message: Message, options?: MessageOptions): Promise<void>;
}
