import {
  ApplicationProviderMock,
  getInputCaptionByContainer,
  ValidationSpy,
} from '@/presentation/test';
import {LoginFormValues} from '@/presentation/types';
import {
  cleanup,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import faker from 'faker';
import React from 'react';
import {Login} from '..';

type SutTypes = {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
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

    const emailCaption = getInputCaptionByContainer(
      getByTestId('email_input_container'),
    );
    const passwordCaption = getInputCaptionByContainer(
      getByTestId('password_input_container'),
    );
    const loginButton = getByTestId('login_button');

    expect(emailInputProps.status).toBe('basic');
    expect(passwordInputProps.status).toBe('basic');
    expect(emailInputProps.value).toBe('');
    expect(passwordInputProps.value).toBe('');
    expect(emailCaption).toBeNull();
    expect(passwordCaption).toBeNull();
    expect(passwordInputProps.secureTextEntry).toBe(true);
    expect(loginButton).not.toBeDisabled();
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

    expect(validationSpy.values).toEqual({
      email: mockPerson.email,
      password: mockPerson.password,
    });
  });

  test('Should show email error if Validation fails', async () => {
    const {
      sut: {getByTestId, getByText},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();
    const emailErrorMessage = 'Invalid E-mail';
    validationSpy.errors = {
      email: emailErrorMessage,
    };

    const emailInput = getByTestId('email_input');

    await waitFor(() => {
      fireEvent.changeText(emailInput, mockPerson.email);
      fireEvent(emailInput, 'onSubmitEditing');
    });

    expect(emailInput.props.status).toBe('danger');
    expect(getByText(emailErrorMessage)).toBeDefined();
  });

  test('Should show password error if Validation fails', async () => {
    const {
      sut: {getByTestId, getByText},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();
    const passwordErrorMessage = 'Invalid Password';
    validationSpy.errors = {
      password: passwordErrorMessage,
    };

    const passwordInput = getByTestId('password_input');

    await waitFor(() => {
      fireEvent.changeText(passwordInput, mockPerson.password);
      fireEvent(passwordInput, 'onSubmitEditing');
    });

    expect(passwordInput.props.status).toBe('danger');
    expect(getByText(passwordErrorMessage)).toBeDefined();
  });

  test('Should show valid state ', async () => {
    const {
      sut: {getByTestId},
      validationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();
    validationSpy.errors = {};

    const emailInput = getByTestId('email_input');
    const passwordInput = getByTestId('password_input');

    await waitFor(() => {
      fireEvent.changeText(emailInput, mockPerson.email);
      fireEvent.changeText(passwordInput, mockPerson.password);
      fireEvent(emailInput, 'onSubmitEditing');
      fireEvent(passwordInput, 'onSubmitEditing');
    });

    expect(emailInput.props.value).toBe(mockPerson.email);
    expect(passwordInput.props.value).toBe(mockPerson.password);

    expect(emailInput.props.status).toBe('basic');
    expect(passwordInput.props.status).toBe('basic');

    const emailCaption = getInputCaptionByContainer(
      getByTestId('email_input_container'),
    );
    const passwordCaption = getInputCaptionByContainer(
      getByTestId('password_input_container'),
    );

    expect(emailCaption).toBeNull();
    expect(passwordCaption).toBeNull();
  });
});
