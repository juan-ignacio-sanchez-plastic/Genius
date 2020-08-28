import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { globalStyles } from '../styles/globalStyles';
import Card from '../shared/Card';
import apiClient from '../apiClient';
import { showFadeMessage } from '../sharedFunctions';
import { ImageBackground } from 'react-native';


export default function DeckDetails ({ navigation }) {
  const addCard = navigation.getParam('addCard');
  const editCard = navigation.getParam('editCard');
  const deleteCard = navigation.getParam('deleteCard');
  const setNextReview = navigation.getParam('setNextReview');
  const deck = navigation.getParam('item');
  const [deckLength, setDeckLength] = useState(deck.cards.length);
  const [fadeMessage, setFadeMessage] = useState(false);

  const handleShare = async (deck) => {
    const sharedDeck = await apiClient.shareDeck(deck);
    if (sharedDeck) setFadeMessage(showFadeMessage('Deck shared'));
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
        <View style={{ flex: 1 }}>
          <NavigationEvents
            onDidFocus={() => setDeckLength(deck.cards.length)}
          />
          <Text style={{ ...globalStyles.titleText, marginBottom: 10 }}>{deck.title}</Text>
          <TouchableOpacity onPress={() => navigation.push('DeckAllCards', { editCard, deleteCard, deck })}>
            <Card>
              <Text style={{ flex: 1, textAlign: 'center' }}>{deckLength} cards</Text>
            </Card>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginVertical: 5 }}>
            <TouchableOpacity onPress={() => navigation.push('DeckAllCards', { editCard, deleteCard, deck })}>
              <Text style={styles.text}>See all cards</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleShare(deck)}>
              <Text>
                <FontAwesome name='share' style={{ fontSize: 20, color: '#4F74FF' }} />
              Share
            </Text>
            </TouchableOpacity>
          </View>
          <Button title='Study' onPress={() => navigation.push('CardDetails', { cardsToStudy: deck.cards.filter(card => card.nextReview < Date.now()), setNextReview, deckTitle: deck.title })} />
          <MaterialIcons
            name='add'
            size={24}
            style={{ ...styles.modalToggle, ...styles.modalClose }}
            onPress={() => navigation.push('AddOrEditCard', { addCard, deckTitle: deck.title })}
          />
        </View >
        {
          fadeMessage
        }
      </View >
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  modalToggle: {
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  }
});