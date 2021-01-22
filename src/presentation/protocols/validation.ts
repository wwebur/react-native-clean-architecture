import {FormikErrors} from 'formik';
import {LoginFormValues} from '../pages/login/login';

export interface Validation {
  validate: (
    values: LoginFormValues,
  ) => void | object | Promise<FormikErrors<LoginFormValues>>;
}
