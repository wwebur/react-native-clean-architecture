import {Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {HomeScreenNavigationProp} from './home';

export type HomeHeaderProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  return (
    <TopNavigation
      testID="home_header"
      alignment="center"
      title="Home"
      accessoryRight={() => (
        <TopNavigationAction
          testID="home_header_logout_button"
          onPress={() => {}}
          icon={(props) => <Icon {...props} name="log-out-outline" />}
        />
      )}
    />
  );
};

export default HomeHeader;
