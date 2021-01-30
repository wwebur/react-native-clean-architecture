import {InvalidCredentialsError, StorageSetError} from '@/domain/errors';
import {
  ApplicationProviderMock,
  AuthenticationSpy,
  fillInputByTestID,
  fillInputs,
  getInputCaptionByContainer,
  HandleAccessTokenMock,
  ValidationSpy,
} from '@/presentation/test';
import {DisplaySpy} from '@/presentation/test/mock-display';
import {NavigationStub} from '@/presentation/test/mock-navigation';
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

type SutTypes = {
  sut: RenderAPI;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
  displaySpy: DisplaySpy;
  handleAccessTokenMock: HandleAccessTokenMock;
  navigationStub: NavigationStub<'Login'>;
};

type SutParams = {
  validationErrors: LoginFormValues;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errors = params?.validationErrors;
  const authenticationSpy = new AuthenticationSpy();
  const displaySpy = new DisplaySpy();
  const handleAccessTokenMock = new HandleAccessTokenMock();
  const navigationStub = new NavigationStub<'Login'>();
  const sut = render(
    <ApplicationProviderMock>
      <Login
        validation={validationSpy}
        authentication={authenticationSpy}
        display={displaySpy}
        handleAccessToken={handleAccessTokenMock}
        navigation={navigationStub}
      />
    </ApplicationProviderMock>,
  );
  return {
    sut,
    validationSpy,
    authenticationSpy,
    displaySpy,
    handleAccessTokenMock,
    navigationStub,
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

  test('Should call Validation with correct values', () => {
    const {sut, validationSpy} = makeSut();
    const mockPerson = makeFakePerson();
    fillInputByTestID(sut, 'email_input', mockPerson.email);
    fillInputByTestID(sut, 'password_input', mockPerson.password);
    expect(validationSpy.values).toEqual({
      email: mockPerson.email,
      password: mockPerson.password,
    });
  });

  test('Should show email error if Validation fails', async () => {
    const validationErrors = {email: 'Invalid E-mail'};
    const {sut} = makeSut({validationErrors});
    await waitFor(() => {
      fillInputByTestID(sut, 'email_input', makeFakePerson().email, true);
    });
    assertStatusForInput(sut, 'email_input', validationErrors);
    expect(sut.getByTestId('login_button')).toBeDisabled();
  });

  test('Should show password error if Validation fails', async () => {
    const validationErrors = {password: 'Invalid Password'};
    const {sut} = makeSut({validationErrors});
    await waitFor(() => {
      fillInputByTestID(sut, 'password_input', makeFakePerson().password, true);
    });
    assertStatusForInput(sut, 'password_input', validationErrors);
    expect(sut.getByTestId('login_button')).toBeDisabled();
  });

  test('Should show valid state ', async () => {
    const {sut} = makeSut();
    const mockPerson = makeFakePerson();
    await waitFor(() => {
      fillInputByTestID(sut, 'email_input', mockPerson.email, true);
      fillInputByTestID(sut, 'password_input', mockPerson.password, true);
    });
    assertValueForInput(sut, 'email_input', mockPerson.email);
    assertValueForInput(sut, 'password_input', mockPerson.password);
    assertStatusForInput(sut, 'email_input');
    assertStatusForInput(sut, 'password_input');
    expect(sut.getByTestId('login_button')).not.toBeDisabled();
  });

  test('Should show spinner on submit', async () => {
    const {sut} = makeSut();
    await waitFor(() => {
      fillInputs(sut);
    });
    const spinner = sut.getByTestId('buttons_container').findByType(Spinner);
    expect(spinner).toBeTruthy();
  });

  test('Should call Authentication with correct values', async () => {
    const {sut, authenticationSpy} = makeSut();
    const mockPerson = makeFakePerson();
    await waitFor(() => {
      fillInputs(sut, mockPerson.email, mockPerson.password);
    });
    expect(authenticationSpy.params).toEqual(mockPerson);
  });

  test('Should call Authentication only once', async () => {
    const {sut, authenticationSpy} = makeSut();
    await waitFor(() => {
      fillInputs(sut);
      fillInputs(sut);
    });
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form has errors', async () => {
    const {sut, authenticationSpy} = makeSut({
      validationErrors: {email: 'required field', password: 'required field'},
    });
    const loginButton = sut.getByTestId('login_button');
    await waitFor(() => {
      fireEvent.press(loginButton);
    });
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should call Display with correct message if Authentication fails', async () => {
    const {sut, authenticationSpy, displaySpy} = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    await waitFor(() => {
      fillInputs(sut);
    });
    const spinner = sut.getByTestId('buttons_container').findAllByType(Spinner);
    expect(displaySpy.title).toBe('Oops!');
    expect(displaySpy.description).toBe(error.message);
    expect(spinner.length).toBe(0);
  });

  test('Should call HandleAccessToken on success and navigate to Home page', async () => {
    const {
      sut,
      authenticationSpy,
      handleAccessTokenMock,
      navigationStub,
    } = makeSut();
    const navigateFunctionSpy = jest.spyOn(navigationStub, 'navigate');
    await waitFor(() => {
      fillInputs(sut);
    });
    expect(handleAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken,
    );
    expect(navigateFunctionSpy).toHaveBeenCalledWith('Home');
  });

  test('Should call Display with correct message if HandleAccessToken fails', async () => {
    const {sut, displaySpy, handleAccessTokenMock} = makeSut();
    const error = new StorageSetError();
    jest
      .spyOn(handleAccessTokenMock, 'save')
      .mockReturnValueOnce(Promise.reject(error));
    await waitFor(() => {
      fillInputs(sut);
    });
    expect(displaySpy.title).toBe('Oops!');
    expect(displaySpy.description).toBe(error.message);
  });

  test('Should go to SignUp page', async () => {
    const {sut, navigationStub} = makeSut();
    const signUpButton = sut.getByTestId('sign_up_button');
    const navigateFunctionSpy = jest.spyOn(navigationStub, 'navigate');
    await waitFor(() => {
      fireEvent.press(signUpButton);
    });
    expect(navigateFunctionSpy).toHaveBeenCalledWith('SignUp');
  });
});
