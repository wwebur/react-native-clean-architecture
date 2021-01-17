import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const Login: React.FC = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <Layout style={styles.container}>
        <Text>Login</Text>
        <Button>Entrar</Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safearea: {flex: 1},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Login;
