import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import CustomButton from '.';
import CenterView from '../CenterView';

storiesOf('CustomButton', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <CustomButton onPress={action('clicked-text')}>
      <Text>{text('CustomButton text', 'Hello CustomButton')}</Text>
    </CustomButton>
  ))
  .add('with some emoji', () => (
    <CustomButton onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </CustomButton>
  ));
