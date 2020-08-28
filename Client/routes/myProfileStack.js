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
    defaultNavigationOptions: {   // here I define the default values for the header, that are going to be the same in all screens, to no repeat the code in navigationOptions of each screen
      headerTintColor: '#444',  // to set the font color in the header
      headerStyle: { backgroundColor: '#eee', height: 70 }
    }
  });

export default MyProfileStack;