import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

export const KeyboardDismiss: React.FC = ({children}) => {
  return (
    <TouchableWithoutFeedback
      testID="keyboard_dismiss"
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};
