import {DisplayFeedbackMessage} from '@/data/usecases/display-message/display-feedback-message';
import {DisplayMessage} from '@/domain/usecases/display-message';
import {MakeMessagePresenter} from '@/main/factories/protocols/message-presenter/message-presenter-factory';

export const MakeDisplayMessage = (): DisplayMessage => {
  return new DisplayFeedbackMessage(MakeMessagePresenter());
};
