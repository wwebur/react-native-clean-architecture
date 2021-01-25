import {Display, DisplayMessage} from '../protocols';

export class DisplaySpy implements Display {
  title: string;
  description: string;
  show(message: DisplayMessage): void {
    this.title = message.title;
    this.description = message.description;
  }
}
