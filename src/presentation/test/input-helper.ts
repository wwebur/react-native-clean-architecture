import {fireEvent, RenderAPI, waitFor} from '@testing-library/react-native';
import {InputProps} from '@ui-kitten/components';
import faker from 'faker';
import {ReactTestInstance} from 'react-test-renderer';

export class InvalidContainerError extends Error {
  constructor() {
    super('Container should have at least one TextInput child');
    this.name = 'InvalidContainerError';
  }
}

export const getInputCaptionByContainer = (
  inputContainer: ReactTestInstance,
): string | null => {
  const inputWrapper = inputContainer.children[0] as ReactTestInstance;
  if (inputWrapper && inputWrapper.children.length > 0) {
    const inputProps = inputWrapper.props as InputProps;
    if (inputProps.caption) {
      return inputProps.caption.toString();
    }
    return null;
  }
  throw new InvalidContainerError();
};

export const fillInputs = async (
  sut: RenderAPI,
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  const {getByTestId} = sut;
  const emailInput = getByTestId('email_input');
  const passwordInput = getByTestId('password_input');
  const loginButton = getByTestId('login_button');

  await waitFor(() => {
    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent(emailInput, 'onSubmitEditing');
    fireEvent(passwordInput, 'onSubmitEditing');
    fireEvent.press(loginButton);
  });
};

export const fillInputByTestID = async (
  sut: RenderAPI,
  inputTestID: string,
  value: string = faker.random.word(),
  submit: boolean = false,
): Promise<void> => {
  const {getByTestId} = sut;
  const input = getByTestId(inputTestID);

  await waitFor(() => {
    fireEvent.changeText(input, value);
    if (submit) {
      fireEvent(input, 'onSubmitEditing');
    }
  });
};
