import {ApplicationProviderMock, ValidationSpy} from '@/presentation/test';
import {LoginFormValues} from '@/presentation/types';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import faker from 'faker';
import React from 'react';
import {Login} from '..';

type SutTypes = {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
};

const makeSut = () => {
  const validationSpy = new ValidationSpy();
  const sut = render(
    <ApplicationProviderMock>
      <Login validation={validationSpy} />
    </ApplicationProviderMock>,
  );
  return {
    sut,
    validationSpy,
  };
};

const makeFakePerson = (): LoginFormValues => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const {
      sut: {getByTestId},
    } = makeSut();

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

  test('Should call Validation with correct values', () => {
    const {
      sut: {getByTestId},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();

    const emailInput = getByTestId('email_input');
    const passwordInput = getByTestId('password_input');

    fireEvent.changeText(emailInput, mockPerson.email);
    fireEvent.changeText(passwordInput, mockPerson.password);

    expect(emailInput.props.value).toBe(mockPerson.email);
    expect(validationSpy.values).toEqual({
      email: mockPerson.email,
      password: mockPerson.password,
    });
  });
});
