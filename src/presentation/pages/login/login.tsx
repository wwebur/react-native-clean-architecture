import {
  Button,
  Icon,
  Input,
  Layout,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableWithoutFeedback} from 'react-native';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const theme = useTheme();

  const initialValues: LoginFormValues = {email: '', password: ''};

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry((prevSecuryTextEntry) => !prevSecuryTextEntry);
  };

  return (
    <>
      <SafeAreaView
        style={[
          styles.topSafeArea,
          {backgroundColor: theme['background-basic-color-4']},
        ]}
      />
      <SafeAreaView
        style={[
          styles.bottomSafeArea,
          {backgroundColor: theme['background-basic-color-1']},
        ]}>
        <Layout style={styles.container} level="4">
          <Layout style={styles.logoContainer} level="4" />

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <Layout style={styles.formContainer}>
                <Text category="h1">Login</Text>
                <Text category="s1" appearance="hint" style={styles.subtitle}>
                  Enter your details to continue
                </Text>
                <Input
                  autoCapitalize="none"
                  size="large"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="email-outline" />
                  )}
                  style={styles.emailInput}
                  label="E-mail"
                  placeholder="Ex: john@doe.com"
                />
                <Input
                  size="large"
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  accessoryLeft={(props) => (
                    <Icon {...props} name="lock-outline" />
                  )}
                  accessoryRight={(props) => (
                    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                      <Icon
                        {...props}
                        name={secureTextEntry ? 'eye-off' : 'eye'}
                      />
                    </TouchableWithoutFeedback>
                  )}
                  style={styles.passwordInput}
                  label="Password"
                  placeholder="**********"
                  secureTextEntry={secureTextEntry}
                />
                <Layout style={styles.buttonsContainer}>
                  <Button size="large" onPress={handleSubmit}>
                    Login
                  </Button>
                  <Text
                    status="danger"
                    category="s2"
                    appearance="hint"
                    style={styles.forgotPassword}>
                    Forgot your password?
                  </Text>
                  <Button
                    size="large"
                    style={styles.signupButton}
                    appearance="outline">
                    Sign-up
                  </Button>
                </Layout>
              </Layout>
            )}
          </Formik>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSafeArea: {flex: 1},
  topSafeArea: {flex: 0},
  container: {flex: 1},
  logoContainer: {flex: 1, width: '100%'},
  formContainer: {
    flex: 3,
    padding: 30,
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
