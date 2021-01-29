import {RootStackParamList} from '@/presentation/routes';
import {GlobalStyles} from '@/presentation/styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignUpHeader from './sign-up-header';

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export type SignUpProps = {
  navigation: SignUpScreenNavigationProp;
};

const SignUp: React.FC<SignUpProps> = ({navigation}) => {
  const theme = useTheme();
  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.topSafeArea,
          {backgroundColor: theme['background-basic-color-1']},
        ]}
      />
      <SafeAreaView
        style={[
          GlobalStyles.bottomSafeArea,
          {backgroundColor: theme['background-basic-color-1']},
        ]}>
        <Layout
          style={GlobalStyles.container}
          level="1"
          testID="signup_page_container">
          <SignUpHeader navigation={navigation} />
          <Layout style={[GlobalStyles.content, styles.content]}>
            <Text>Sign Up</Text>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default SignUp;
