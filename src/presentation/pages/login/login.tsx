import {Authentication, HandleAccessToken} from '@/domain/usecases';
import {DefaultI18n, LoginI18n, translate} from '@/locale';
import {Display} from '@/presentation/protocols';
import {RootStackParamList} from '@/presentation/routes';
import {GlobalStyles} from '@/presentation/styles';
import {LoginFormValues} from '@/presentation/types';
import {Validation} from '@/validation/protocols';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  useTheme,
} from '@ui-kitten/components';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
  display: Display;
  handleAccessToken: HandleAccessToken;
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
  display,
  handleAccessToken,
  navigation,
}) => {
  const theme = useTheme();

  const initialValues: LoginFormValues = {email: '', password: ''};

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleSecureEntry = () => {
    setSecureTextEntry((prevSecuryTextEntry) => !prevSecuryTextEntry);
  };

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      if (loading) {
        return;
      }
      setLoading(true);
      const account = await authentication.auth({
        email: values.email,
        password: values.password,
      });
      await handleAccessToken.save(account.accessToken);
      navigation.navigate('Home');
    } catch (error) {
      setLoading(false);
      display.show({title: 'Oops!', description: error.message});
    }
  };

  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.topSafeArea,
          {backgroundColor: theme['background-basic-color-4']},
        ]}
      />
      <SafeAreaView
        style={[
          GlobalStyles.bottomSafeArea,
          {backgroundColor: theme['background-basic-color-1']},
        ]}>
        <Layout
          style={GlobalStyles.container}
          level="4"
          testID="login_page_container">
          <Layout style={styles.logoContainer} level="4" />

          <Formik
            validateOnMount={false}
            validateOnChange
            validateOnBlur
            initialValues={initialValues}
            validate={(values) => {
              return validation.validate({
                email: values.email,
                password: values.password,
              });
            }}
            onSubmit={onSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
              setFieldTouched,
            }) => (
              <Layout testID="form_container" style={styles.formContainer}>
                <Text category="h1">{translate(LoginI18n.login)}</Text>
                <Text category="s1" appearance="hint" style={styles.subtitle}>
                  {translate(LoginI18n.subtitle)}
                </Text>
                <View testID="email_input_container">
                  <Input
                    testID="email_input"
                    autoCapitalize="none"
                    size="large"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    accessoryLeft={(props) => (
                      <Icon {...props} name="email-outline" />
                    )}
                    style={styles.emailInput}
                    label={translate(DefaultI18n.email)}
                    placeholder="Ex: john@doe.com"
                    onSubmitEditing={() => setFieldTouched('email', true)}
                    status={touched.email && errors.email ? 'danger' : 'basic'}
                    captionIcon={
                      touched.email && errors.email
                        ? (props) => <Icon {...props} name="info-outline" />
                        : null
                    }
                    caption={
                      touched.email && errors.email ? errors.email : null
                    }
                  />
                </View>
                <View testID="password_input_container">
                  <Input
                    testID="password_input"
                    size="large"
                    autoCapitalize="none"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    accessoryLeft={(props) => (
                      <Icon {...props} name="lock-outline" />
                    )}
                    accessoryRight={(props) => (
                      <TouchableWithoutFeedback
                        testID="visibility_touchable"
                        onPress={toggleSecureEntry}>
                        <Icon
                          {...props}
                          name={secureTextEntry ? 'eye-off' : 'eye'}
                        />
                      </TouchableWithoutFeedback>
                    )}
                    style={styles.passwordInput}
                    label={translate(DefaultI18n.password)}
                    placeholder="**********"
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={() => setFieldTouched('password', true)}
                    status={
                      touched.password && errors.password ? 'danger' : 'basic'
                    }
                    captionIcon={
                      touched.password && errors.password
                        ? (props) => <Icon {...props} name="info-outline" />
                        : null
                    }
                    caption={
                      touched.password && errors.password
                        ? errors.password
                        : null
                    }
                  />
                </View>
                <Layout
                  testID="buttons_container"
                  style={styles.buttonsContainer}>
                  <Button
                    accessoryLeft={
                      loading
                        ? (props) => <Spinner {...props} testID="spinner" />
                        : null
                    }
                    disabled={!!errors.email || !!errors.password || loading}
                    testID="login_button"
                    size="large"
                    onPress={handleSubmit}>
                    {translate(LoginI18n.login)}
                  </Button>
                  <Text
                    testID="forgot_password_text"
                    status="danger"
                    category="s2"
                    appearance="hint"
                    style={styles.forgotPassword}>
                    {translate(LoginI18n.forgotPassword)}
                  </Text>
                  <Button
                    onPress={() => navigation.navigate('SignUp')}
                    testID="sign_up_button"
                    size="large"
                    style={styles.signupButton}
                    appearance="outline">
                    {translate(LoginI18n.signUp)}
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
