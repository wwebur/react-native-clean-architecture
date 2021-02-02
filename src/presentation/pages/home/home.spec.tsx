import {ApplicationProviderMock} from '@/presentation/test';
import {NavigationStub} from '@/presentation/test/mock-navigation';
import {render} from '@testing-library/react-native';
import React from 'react';
import Home from './home';

describe('Home Page', () => {
  test('Should start with initial state', () => {
    const navigationStub = new NavigationStub<'Home'>();
    const sut = render(
      <ApplicationProviderMock>
        <Home navigation={navigationStub} />
      </ApplicationProviderMock>,
    );
    expect(sut.getByTestId('home_header')).toBeDefined();
  });
});
