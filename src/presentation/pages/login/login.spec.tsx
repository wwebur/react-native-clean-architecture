import {
  ApplicationProviderMock,
  AuthenticationSpy,
  fillInputByTestID,
  fillInputs,
  getInputCaptionByContainer,
  ValidationSpy,
} from '@/presentation/test';
import {LoginFormValues} from '@/presentation/types';
import {cleanup, render, RenderAPI} from '@testing-library/react-native';
import {Spinner} from '@ui-kitten/components';
import faker from 'faker';
import React from 'react';
import {Login} from '..';

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

export const assertStatusForInput = (
  sut: RenderAPI,
  inputTestID: string,
  validationError?: LoginFormValues,
): void => {
  const assertStatus = validationError ? 'danger' : 'basic';
  expect(sut.getByTestId(inputTestID)).toHaveProp('status', assertStatus);
  if (!validationError) {
    expect(
      getInputCaptionByContainer(sut.getByTestId(`${inputTestID}_container`)),
    ).toBeNull();
  } else {
    expect(
      getInputCaptionByContainer(sut.getByTestId(`${inputTestID}_container`)),
    ).toBe(validationError[inputTestID.split('_')[0]]);
  }
};

export const assertValueForInput = (
  sut: RenderAPI,
  inputTestID: string,
  expectedValue: string,
): void => {
  expect(sut.getByTestId(inputTestID)).toHaveProp('value', expectedValue);
};

describe('Login Page', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const {sut} = makeSut();
    assertStatusForInput(sut, 'email_input');
    assertStatusForInput(sut, 'password_input');
    assertValueForInput(sut, 'email_input', '');
    assertValueForInput(sut, 'password_input', '');
    expect(sut.getByTestId('password_input')).toHaveProp(
      'secureTextEntry',
      true,
    );
    expect(sut.getByTestId('login_button')).not.toBeDisabled();
  });

  test('Should call Validation with correct values', async () => {
    const {sut, validationSpy} = makeSut();
    const mockPerson = makeFakePerson();
    await fillInputByTestID(sut, 'email_input', mockPerson.email);
    await fillInputByTestID(sut, 'password_input', mockPerson.password);
    expect(validationSpy.values).toEqual({
      email: mockPerson.email,
      password: mockPerson.password,
    });
  });

  test('Should show email error if Validation fails', async () => {
    const validationErrors = {email: 'Invalid E-mail'};
    const {sut} = makeSut({validationErrors});
    await fillInputByTestID(sut, 'email_input', makeFakePerson().email, true);
    assertStatusForInput(sut, 'email_input', validationErrors);
    expect(sut.getByTestId('login_button')).toBeDisabled();
  });

  test('Should show password error if Validation fails', async () => {
    const validationErrors = {password: 'Invalid Password'};
    const {sut} = makeSut({validationErrors});
    await fillInputByTestID(
      sut,
      'password_input',
      makeFakePerson().password,
      true,
    );
    assertStatusForInput(sut, 'password_input', validationErrors);
    expect(sut.getByTestId('login_button')).toBeDisabled();
  });

  test('Should show valid state ', async () => {
    const {sut} = makeSut();
    const mockPerson = makeFakePerson();
    await fillInputByTestID(sut, 'email_input', mockPerson.email, true);
    await fillInputByTestID(sut, 'password_input', mockPerson.password, true);
    assertValueForInput(sut, 'email_input', mockPerson.email);
    assertValueForInput(sut, 'password_input', mockPerson.password);
    assertStatusForInput(sut, 'email_input');
    assertStatusForInput(sut, 'password_input');
    expect(sut.getByTestId('login_button')).not.toBeDisabled();
  });

  test('Should show spinner on submit', async () => {
    const {sut} = makeSut();
    await fillInputs(sut);
    const spinner = sut.getByTestId('buttons_container').findByType(Spinner);
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', async () => {
    const {sut, authenticationSpy} = makeSut();
    const mockPerson = makeFakePerson();
    await fillInputs(sut, mockPerson.email, mockPerson.password);
    expect(authenticationSpy.params).toEqual(mockPerson);
  });
});
