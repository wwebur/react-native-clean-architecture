import {InputProps} from '@ui-kitten/components';
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
