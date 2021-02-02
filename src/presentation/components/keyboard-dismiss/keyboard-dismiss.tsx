import {GlobalStyles} from '@/presentation/styles';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';

export const KeyboardDismiss: React.FC = ({children}) => {
  return (
    <TouchableWithoutFeedback
      testID="keyboard_dismiss"
      onPress={() => Keyboard.dismiss()}
      accessible={false}>
      <View style={GlobalStyles.container}>{children}</View>
    </TouchableWithoutFeedback>
  );
};
