import {Message} from '../models';

export interface DisplayMessage {
  show(message: Message): Promise<void>;
}
