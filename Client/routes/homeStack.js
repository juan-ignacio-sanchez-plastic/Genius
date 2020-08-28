import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../screens/Home';
import CardDetails from '../screens/CardDetails';
import DeckDetails from '../screens/DeckDetails';
import AddOrEditCard from '../screens/AddOrEditCard';
import DeckAllCards from '../screens/DeckAllCards';
import Header from '../shared/Header';

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header navigation={navigation} title='Genius' />,
      }
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: 'Deck Details',
      headerTitleAlign: 'center'
    }
  },
  CardDetails: {
    screen: CardDetails,
    navigationOptions: {
      title: 'Card Details',
      headerTitleAlign: 'center'
    }
  },
  AddOrEditCard: {
    screen: AddOrEditCard,
    navigationOptions: {
      title: 'Your Card',
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

const HomeStack = createStackNavigator(screens,
  {
    defaultNavigationOptions: {
      headerTintColor: '#444',
      headerStyle: { backgroundColor: '#eee', height: 70 },
    },
  });

export default HomeStack;