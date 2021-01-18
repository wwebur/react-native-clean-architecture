import {Button, Icon, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const Login: React.FC = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <Layout style={styles.container} level="4">
        <Layout style={styles.logoContainer} level="4" />
        <Layout style={styles.formContainer}>
          <Text category="h1">Login</Text>
          <Text category="s1" appearance="hint" style={styles.subtitle}>
            Enter your details to continue
          </Text>
          <Input
            accessoryLeft={(props) => <Icon {...props} name="email-outline" />}
            style={styles.emailInput}
            label="E-mail"
            placeholder="Ex: john@doe.com"
          />
          <Input
            accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
            accessoryRight={(props) => (
              <TouchableWithoutFeedback onPress={() => {}}>
                <Icon {...props} name={true ? 'eye-off' : 'eye'} />
              </TouchableWithoutFeedback>
            )}
            style={styles.passwordInput}
            label="Password"
            placeholder="**********"
            secureTextEntry
          />
          <Layout style={styles.buttonsContainer}>
            <Button>Login</Button>
            <Text
              status="danger"
              category="s2"
              appearance="hint"
              style={styles.forgotPassword}>
              Forgot your password?
            </Text>
            <Button style={styles.signupButton} appearance="outline">
              Sign-up
            </Button>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {flex: 1},
  container: {flex: 1},
  logoContainer: {flex: 1, width: '100%'},
  formContainer: {
    flex: 3,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  subtitle: {marginTop: 8},
  emailInput: {marginTop: 45},
  passwordInput: {marginTop: 20},
  buttonsContainer: {marginTop: 60},
  forgotPassword: {marginTop: 12, alignSelf: 'center'},
  signupButton: {marginTop: 45},
});

export default Login;
