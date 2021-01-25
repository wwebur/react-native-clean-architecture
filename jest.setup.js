/* eslint-disable no-undef */
import {setLanguageToI18n} from '@/locale';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.SettingsManager = {settings: {AppleLocale: 'en_US'}};
  RN.NativeModules.I18nManager = {localeIdentifier: 'en_US'};
  return RN;
});

setLanguageToI18n();
