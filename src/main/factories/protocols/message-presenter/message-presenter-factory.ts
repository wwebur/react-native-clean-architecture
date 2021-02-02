import {MessagePresenter} from '@/data/protocols/message-presenter/message-presenter';
import {FlashMessageAdapter} from '@/infra/message-presenter/flash-message-adapter';

export const MakeMessagePresenter = (): MessagePresenter => {
  return new FlashMessageAdapter();
};
