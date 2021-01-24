import {AccountModel} from '@/domain/models';
import {mockAccountModel} from '@/domain/test';
import {Authentication, AuthenticationParams} from '@/domain/usecases';
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
import {Spinner} from '@ui-kitten/components';
import faker from 'faker';
import React from 'react';
import {Login} from '..';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationErrors: LoginFormValues;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errors = params?.validationErrors;
  const authenticationSpy = new AuthenticationSpy();
  const sut = render(
    <ApplicationProviderMock>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </ApplicationProviderMock>,
  );
  return {
    sut,
    validationSpy,
    authenticationSpy,
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
    const emailErrorMessage = 'Invalid E-mail';
    const {
      sut: {getByTestId, getByText},
    } = makeSut({validationErrors: {email: emailErrorMessage}});
    const mockPerson = makeFakePerson();

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
    const passwordErrorMessage = 'Invalid Password';
    const {
      sut: {getByTestId, getByText},
    } = makeSut({validationErrors: {password: passwordErrorMessage}});
    const mockPerson = makeFakePerson();

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
    } = makeSut();
    const mockPerson = makeFakePerson();

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

  test('Should show spinner on submit', async () => {
    const {
      sut: {getByTestId},
    } = makeSut();
    const mockPerson = makeFakePerson();

    const emailInput = getByTestId('email_input');
    const passwordInput = getByTestId('password_input');
    const loginButton = getByTestId('login_button');

    await waitFor(() => {
      fireEvent.changeText(emailInput, mockPerson.email);
      fireEvent.changeText(passwordInput, mockPerson.password);
      fireEvent(emailInput, 'onSubmitEditing');
      fireEvent(passwordInput, 'onSubmitEditing');
      fireEvent.press(loginButton);
    });

    const spinner = getByTestId('buttons_container').findByType(Spinner);
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', async () => {
    const {
      sut: {getByTestId},
      authenticationSpy,
    } = makeSut();
    const mockPerson = makeFakePerson();

    const emailInput = getByTestId('email_input');
    const passwordInput = getByTestId('password_input');
    const loginButton = getByTestId('login_button');

    await waitFor(() => {
      fireEvent.changeText(emailInput, mockPerson.email);
      fireEvent.changeText(passwordInput, mockPerson.password);
      fireEvent(emailInput, 'onSubmitEditing');
      fireEvent(passwordInput, 'onSubmitEditing');
      fireEvent.press(loginButton);
    });

    expect(authenticationSpy.params).toEqual(mockPerson);
  });
});
