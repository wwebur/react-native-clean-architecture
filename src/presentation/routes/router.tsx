import {Login, SignUp} from '@/presentation/pages';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '.';

const Stack = createStackNavigator<RootStackParamList>();

const Router: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default Router;
