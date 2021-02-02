import {ApplicationProviderMock} from '@/presentation/test';
import {NavigationStub} from '@/presentation/test/mock-navigation';
import {
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {SignUp} from '..';

type SutTypes = {
  sut: RenderAPI;
  navigationStub: NavigationStub<'SignUp'>;
};

const makeSut = (): SutTypes => {
  const navigationStub = new NavigationStub<'SignUp'>();
  const sut = render(
    <ApplicationProviderMock>
      <SignUp navigation={navigationStub} />
    </ApplicationProviderMock>,
  );
  return {
    navigationStub,
    sut,
  };
};

describe('SignUp Page', () => {
  test('Should start with initial state', () => {
    const {sut} = makeSut();
    expect(sut.getByTestId('signup_header')).toBeDefined();
  });

  test('Should call navigation goback on SignOut button press ', async () => {
    const {sut, navigationStub} = makeSut();
    const navigateFunctionSpy = jest.spyOn(navigationStub, 'goBack');
    await waitFor(() => {
      fireEvent.press(
        sut.getByTestId('signup_header').findByType(TopNavigationAction),
      );
    });
    expect(navigateFunctionSpy).toHaveBeenCalled();
  });
});
