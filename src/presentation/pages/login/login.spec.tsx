import ApplicationProviderMock from '@/presentation/test/application-provider-mock';
import {render} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import React from 'react';
import {Login} from '..';

describe('Login Page', () => {
  test('Should start with initial state', () => {
    const {getByTestId} = render(
      <ApplicationProviderMock>
        <Login />
      </ApplicationProviderMock>,
    );

    const emailInputProps = getByTestId('email_input').props as InputProps;
    const passwordInputProps = getByTestId('password_input')
      .props as InputProps;

    expect(emailInputProps.status).toBe('basic');
    expect(passwordInputProps.status).toBe('basic');
    expect(emailInputProps.value).toBe('');
    expect(passwordInputProps.value).toBe('');
    expect(emailInputProps.caption).toBeUndefined();
    expect(passwordInputProps.caption).toBeUndefined();
    expect(passwordInputProps.secureTextEntry).toBe(true);
  });
});
