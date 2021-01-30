import {RootStackParamList} from '@/presentation/routes';
import {GlobalStyles} from '@/presentation/styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {Layout, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import HomeHeader from './home-header';

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
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
          testID="home_page_container">
          <HomeHeader navigation={navigation} />
          <Layout style={[GlobalStyles.content, styles.content]}>
            <Text>Home</Text>
          </Layout>
        </Layout>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Home;
