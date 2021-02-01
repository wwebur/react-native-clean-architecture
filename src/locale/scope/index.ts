export type I18nScope = 'default' | 'login' | 'homepage';

export enum LoginI18n {
  login = 'login.login',
  signUp = 'login.signUp',
  subtitle = 'login.subtitle',
  forgotPassword = 'login.forgotPassword',
}

export enum DefaultI18n {
  email = 'default.email',
  password = 'default.password',
}

export enum TestsI18n {
  helloWorld = 'tests.helloWorld',
  wrong = 'tests.wrong',
}

export enum ErrorsI18n {
  invalidCredentialsError = 'errors.invalidCredentialsError',
  unexpectedError = 'errors.unexpectedError',
  storageSetError = 'errors.storageSetError',
  storageGetError = 'errors.storageGetError',
  storageClearError = 'errors.storageClearError',
  requiredFieldError = 'errors.requiredFieldError',
  invalidEmailFieldError = 'errors.invalidEmailFieldError',
  invalidOtherFieldError = 'errors.invalidOtherFieldError',
}

export type I18nKeys = LoginI18n | ErrorsI18n | DefaultI18n | TestsI18n;
