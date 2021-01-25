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

export enum ErrorsI18n {
  invalidCredentialsError = 'errors.invalidCredentialsError',
  unexpectedError = 'errors.unexpectedError',
}

export type I18nKeys = LoginI18n | ErrorsI18n | DefaultI18n;
