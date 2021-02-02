import {ApplicationProviderMock} from '@/presentation/test';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import {Keyboard} from 'react-native';
import {KeyboardDismiss} from './keyboard-dismiss';

type SutTypes = {
  sut: RenderAPI;
};

const makeSut = (): SutTypes => {
  const sut = render(
    <ApplicationProviderMock>
      <KeyboardDismiss />
    </ApplicationProviderMock>,
  );
  return {
    sut,
  };
};

describe('KeyboardDismiss', () => {
  test('Should call Keyboard dismiss method on tap', async () => {
    const {sut} = makeSut();
    const keyboardSpy = jest.spyOn(Keyboard, 'dismiss');
    const keyboardDismiss = sut.getByTestId('keyboard_dismiss');
    await waitFor(() => {
      fireEvent.press(keyboardDismiss);
    });
    expect(keyboardSpy).toHaveBeenCalled();
  });
});
