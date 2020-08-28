import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Community from '../screens/Community';
import CommunityDeckDetails from '../screens/CommunityDeckDetails';
import DeckAllCards from '../screens/DeckAllCards';
import Header from '../shared/Header';

const screens = {
  Community: {
    screen: Community,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Community' />,
      }
    },
  },
  CommunityDeckDetails: {
    screen: CommunityDeckDetails,
    navigationOptions: {
      title: 'Deck Details',
      headerTitleAlign: 'center'
    }
  },
  DeckAllCards: {
    screen: DeckAllCards,
    navigationOptions: {
      title: 'Your Cards',
      headerTitleAlign: 'center'
    }
  },
}

const CommunityStack = createStackNavigator(screens,
  {
    defaultNavigationOptions: {
      headerTintColor: '#444',
      headerStyle: { backgroundColor: '#eee', height: 70 }
    }
  });

export default CommunityStack;