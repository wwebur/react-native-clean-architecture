import I18n from 'i18n-js';
import {NativeModules, Platform} from 'react-native';
import en from './lang/en-US';
import pt from './lang/pt-BR';
import {I18nKeys} from './scope';

// Function that will help us to normalize the translations that will be received by the function getLanguageByDevice
// This is necessary because in android and iOS the return of the same language can be different
// Example: on iOS we can receive pt_US and on android pt_BR for the Brazilian Portuguese language.
const normalizeTranslate = {
  en_US: 'en',
  pt_BR: 'pt',
  en: 'en',
  pt_US: 'pt',
};

// Function responsible for acquiring the language used on the device
const getLanguageByDevice = () => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;
};

// Here we set the languages that I18N will support
I18n.translations = {
  en,
  pt,
};

// Function responsible for checking if the current language of the device is being supported, otherwise it will be set to 'en_US'
export const setLanguageToI18n = () => {
  const language = getLanguageByDevice();
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(
    translateNormalize,
  );
  iHaveThisLanguage
    ? (I18n.locale = translateNormalize)
    : (I18n.defaultLocale = 'en_US');
};

setLanguageToI18n();

export function translate(key: I18nKeys): string {
  return I18n.t(key);
}

export * from './scope';
