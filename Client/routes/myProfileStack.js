import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import MyProfile from '../screens/MyProfile';
import Header from '../shared/Header';

const screens = {
  myProfile: {
    screen: MyProfile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='My Profile' />,
      }
    }
  },
}

const MyProfileStack = createStackNavigator(screens,
  {
    defaultNavigationOptions: {
      headerTintColor: '#444',
      headerStyle: { backgroundColor: '#eee', height: 70 }
    }
  });

export default MyProfileStack;