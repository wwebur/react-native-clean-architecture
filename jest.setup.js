import {setLanguageToI18n} from '@/locale';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {settings: {AppleLocale: 'en_US'}};
  RN.NativeModules.I18nManager = {localeIdentifier: 'en_US'};
  return RN;
});

mockAsyncStorage.setItem = jest.fn((_key, _value) => {});

mockAsyncStorage.getItem = jest.fn((_key) => {});

setLanguageToI18n();
