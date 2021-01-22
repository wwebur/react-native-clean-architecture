import {Validation} from '@/presentation/protocols/validation';
import ApplicationProviderMock from '@/presentation/test/application-provider-mock';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import faker from 'faker';
import {FormikErrors} from 'formik';
import React from 'react';
import {Login} from '..';
import {LoginFormValues} from './login';

type SutTypes = {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errors: void | object | Promise<FormikErrors<LoginFormValues>>;
  values: LoginFormValues;

  validate(
    values: LoginFormValues,
  ): void | object | Promise<FormikErrors<LoginFormValues>> {
    this.values = values;
    return this.errors;
  }
}

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

  test('Should call Validation with correct email', () => {
    const {
      sut: {getByTestId},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();

    const emailInput = getByTestId('email_input');

    fireEvent.changeText(emailInput, mockPerson.email);

    expect(emailInput.props.value).toBe(mockPerson.email);
    expect(validationSpy.values).toEqual({
      email: mockPerson.email,
      password: '',
    });
  });

  test('Should call Validation with correct password', () => {
    const {
      sut: {getByTestId},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();

    const passwordInput = getByTestId('password_input');

    fireEvent.changeText(passwordInput, mockPerson.password);

    expect(passwordInput.props.value).toBe(mockPerson.password);
    expect(validationSpy.values).toEqual({
      email: '',
      password: mockPerson.password,
    });
  });
});
