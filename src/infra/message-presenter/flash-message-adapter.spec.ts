import {UnexpectedError} from '@/domain/errors';
import {makeFakeMessage} from '@/domain/test';
import faker from 'faker';
import {FlashMessageAdapter} from './flash-message-adapter';
const FlashMessage = require('react-native-flash-message');

describe('FlashMessageAdapter', () => {
  test('Should call react-native-flash-message with correct values', async () => {
    const sut = new FlashMessageAdapter();
    const fakeMessage = makeFakeMessage();
    const librarySpy = jest.spyOn(FlashMessage, 'showMessage');
    await sut.show(fakeMessage);
    expect(librarySpy).toHaveBeenCalledWith({
      message: fakeMessage.title,
      description: fakeMessage.description,
    });
  });

  test('Should throw UnexpectedError if react-native-flash-message throws error', async () => {
    const sut = new FlashMessageAdapter();
    const fakeMessage = makeFakeMessage();
    jest.spyOn(FlashMessage, 'showMessage').mockImplementationOnce(() => {
      throw new Error(faker.random.words());
    });
    const promise = sut.show(fakeMessage);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
