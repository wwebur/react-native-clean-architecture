import {Button, ButtonProps} from '@ui-kitten/components';
import React from 'react';

const CustomButton: React.FC<ButtonProps> = ({onPress, children}) => {
  return <Button onPress={onPress}>{children}</Button>;
};

export default CustomButton;
