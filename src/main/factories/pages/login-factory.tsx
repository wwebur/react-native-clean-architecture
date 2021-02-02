import {Login} from '@/presentation/pages';
import {RootStackParamList} from '@/presentation/routes';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  MakeDisplayMessage,
  MakeHandleAccessToken,
  MakeRemoteAuthentication,
} from '../usecases';
import {MakeLoginValidation} from './login-validation-factory';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export const makeLogin: React.FC<Props> = ({navigation}) => {
  return (
    <Login
      validation={MakeLoginValidation()}
      authentication={MakeRemoteAuthentication()}
      display={MakeDisplayMessage()}
      handleAccessToken={MakeHandleAccessToken()}
      navigation={navigation}
    />
  );
};
