import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import MyProfileStack from './myProfileStack';
import CommunityStack from './communityStack';
import AboutStack from './aboutStack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const RootDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <MaterialIcons name="home" size={25} color={tintColor} />
    },
  },
  Profile: {
    screen: MyProfileStack,
    navigationOptions: {
      title: 'My Profile',
      drawerIcon: ({ tintColor }) => <MaterialIcons name="person" size={25} color={tintColor} />
    }
  },
  Community: {
    screen: CommunityStack,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <FontAwesome name="group" size={20} color={tintColor} />
    }
  },
  About: {
    screen: AboutStack,
    navigationOptions: {
      drawerIcon: ({ tintColor }) => <MaterialIcons name="info-outline" size={25} color={tintColor} />
    }
  },
}
);

export default createAppContainer(RootDrawerNavigator);