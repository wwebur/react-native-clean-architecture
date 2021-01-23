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

    const emailInput = getByTestId('email_input');
    const passwordInput = getByTestId('password_input');

    expect(emailInput).toHaveProp('status', 'basic');
    expect(passwordInput).toHaveProp('status', 'basic');
    expect(emailInput).toHaveProp('value', '');
    expect(passwordInput).toHaveProp('value', '');
    expect(passwordInput).toHaveProp('secureTextEntry', true);
    expect(
      getInputCaptionByContainer(getByTestId('email_input_container')),
    ).toBeNull();
    expect(
      getInputCaptionByContainer(getByTestId('password_input_container')),
    ).toBeNull();
    expect(getByTestId('login_button')).not.toBeDisabled();
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

    expect(emailInput).toHaveProp('status', 'danger');
    expect(getByText(emailErrorMessage)).toBeDefined();
    expect(getByTestId('login_button')).toBeDisabled();
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

    expect(passwordInput).toHaveProp('status', 'danger');
    expect(getByText(passwordErrorMessage)).toBeDefined();
    expect(getByTestId('login_button')).toBeDisabled();
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

    expect(emailInput).toHaveProp('value', mockPerson.email);
    expect(passwordInput).toHaveProp('value', mockPerson.password);
    expect(emailInput).toHaveProp('status', 'basic');
    expect(passwordInput).toHaveProp('status', 'basic');
    expect(
      getInputCaptionByContainer(getByTestId('email_input_container')),
    ).toBeNull();
    expect(
      getInputCaptionByContainer(getByTestId('password_input_container')),
    ).toBeNull();
    expect(getByTestId('login_button')).not.toBeDisabled();
  });
});
