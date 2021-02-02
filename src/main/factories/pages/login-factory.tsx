import {RemoteAuthentication} from '@/data/usecases/authentication/remote-authentication';
import {DisplayFeedbackMessage} from '@/data/usecases/display-message/display-feedback-message';
import {LocalAccessTokenHandler} from '@/data/usecases/handle-access-token/local-access-token-handler';
import {AxiosHttpClient} from '@/infra/http/axios-http-client/axios-http-client';
import {FlashMessageAdapter} from '@/infra/message-presenter/flash-message-adapter';
import {LocalStorageAdapter} from '@/infra/storage/local-storage-adapter';
import {Login} from '@/presentation/pages';
import {RootStackParamList} from '@/presentation/routes';
import {ValidationBuilder} from '@/validation/builder/validation-builder';
import {ValidationComposite} from '@/validation/validators';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

export const makeLogin: React.FC<Props> = ({navigation}) => {
  const url = 'http://fordevs.herokuapp.com/api/login';
  const axiosHttpClient = new AxiosHttpClient();
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);

  const messagePresenter = new FlashMessageAdapter();
  const displayMessage = new DisplayFeedbackMessage(messagePresenter);

  const storage = new LocalStorageAdapter();
  const handleAccessToken = new LocalAccessTokenHandler(storage);

  const validations = [
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(8).build(),
  ];
  const loginValidation = ValidationComposite.build(validations);

  return (
    <Login
      validation={loginValidation}
      authentication={remoteAuthentication}
      display={displayMessage}
      handleAccessToken={handleAccessToken}
      navigation={navigation}
    />
  );
};
