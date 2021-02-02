import {Message} from '@/domain/models';
import {DisplayMessage} from '@/domain/usecases/display-message';

export class DisplaySpy implements DisplayMessage {
  title: string;
  description: string;
  async show(message: Message): Promise<void> {
    this.title = message.title;
    this.description = message.description;
  }
}
