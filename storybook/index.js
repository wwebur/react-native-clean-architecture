// if you use expo remove this line
import * as eva from '@eva-design/eva';
import {withKnobs} from '@storybook/addon-knobs';
import {addDecorator, configure, getStorybookUI} from '@storybook/react-native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React from 'react';
import {AppRegistry} from 'react-native';
import './rn-addons';

const withUIKittenProvider = (story) => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      {story()}
    </ApplicationProvider>
  </>
);

// enables knobs for all stories
addDecorator(withKnobs);
addDecorator(withUIKittenProvider);

// import stories
configure(() => {
  require('./stories');
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

// If you are using React Native vanilla and after installation you don't see your app name here, write it manually.
// If you use Expo you should remove this line.
AppRegistry.registerComponent('RNCleanArchitecture', () => StorybookUIRoot);

export default StorybookUIRoot;
