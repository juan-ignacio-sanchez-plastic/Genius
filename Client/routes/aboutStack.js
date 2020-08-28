import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import About from '../screens/About';
import Header from '../shared/Header';

const screens = {
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='About' />,
      }
    }
  },
}

const AboutStack = createStackNavigator(screens,
  {
    defaultNavigationOptions: {   // here I define the default values for the header, that are going to be the same in all screens, to no repeat the code in navigationOptions of each screen
      headerTintColor: '#444',  // to set the font color in the header
      headerStyle: { backgroundColor: '#eee', height: 70 },
    }
  });

export default AboutStack;