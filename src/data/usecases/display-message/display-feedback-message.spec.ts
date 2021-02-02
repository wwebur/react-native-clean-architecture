import {MessagePresenterSpy} from '@/data/test';
import {makeFakeMessage} from '@/domain/test';
import faker from 'faker';
import {DisplayFeedbackMessage} from './display-feedback-message';

type SutTypes = {
  sut: DisplayFeedbackMessage;
  messagePresenterSpy: MessagePresenterSpy;
};

const makeSut = (): SutTypes => {
  const messagePresenterSpy = new MessagePresenterSpy();
  const sut = new DisplayFeedbackMessage(messagePresenterSpy);
  return {sut, messagePresenterSpy};
};

describe('DisplayFeedbackMessage', () => {
  test('Should call MessagePresenter with correct values on set', () => {
    const {sut, messagePresenterSpy} = makeSut();
    const fakeMessage = makeFakeMessage();
    sut.show(
      {title: fakeMessage.title, description: fakeMessage.description},
      {appearance: 'floating', type: 'default'},
    );
    expect(messagePresenterSpy.message.title).toBe(fakeMessage.title);
    expect(messagePresenterSpy.message.description).toBe(
      fakeMessage.description,
    );
    expect(messagePresenterSpy.options.appearance).toBe('floating');
    expect(messagePresenterSpy.options.type).toBe('default');
  });

  test('Should throw error if MessagePresenter throws error', () => {
    const {sut, messagePresenterSpy} = makeSut();
    const errorMessage = faker.random.words();
    const fakeMessage = makeFakeMessage();
    jest
      .spyOn(messagePresenterSpy, 'show')
      .mockRejectedValueOnce(new Error(errorMessage));

    const promise = sut.show({
      title: fakeMessage.title,
      description: fakeMessage.description,
    });
    expect(promise).rejects.toThrow(new Error(errorMessage));
  });
});
