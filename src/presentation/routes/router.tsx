import {Home, SignUp} from '@/presentation/pages';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {RootStackParamList} from '.';

const Stack = createStackNavigator<RootStackParamList>();

type Props = {
  makeLogin: React.FC;
};

const Router: React.FC<Props> = ({makeLogin}) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={makeLogin} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Router;
