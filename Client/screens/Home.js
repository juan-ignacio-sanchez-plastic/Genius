import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";

import { globalStyles } from '../styles/globalStyles';
import CardSchema from '../schemas/CardSchema';
import DeckSchema from '../schemas/DeckSchema';
import Card from '../shared/Card';
import AddOrEditCard from './AddOrEditCard';
import mockDatabase from '../mockDatabase';
import { storeData, getData } from '../sharedFunctions';
import config from '../config';

export default function Home ({ navigation, screenProps }) {
  const { decks, setDecks } = screenProps;
  const [modalOpen, setModalOpen] = useState(false);
  const [popUpNewDeck, setPopUpNewDeck] = useState(false);
  const [newDeckName, setNewDeckName] = useState();
  const [popUpDeleteDeck, setPopUpDeleteDeck] = useState(false);
  const [deckToDelete, setDeckToDelete] = useState();

  useEffect(() => {
    setMockDataIfIsFirstTime();
    getDecks();
  }, []);

  useEffect(() => {
    storeDecks(decks);
  }, [decks]);

  const setMockDataIfIsFirstTime = async () => {
    const userHaveUsedTheApp = await getData('userHaveUsedTheApp');
    if (!userHaveUsedTheApp) {
      storeDecks(mockDatabase);
      getDecks();
      await storeData(true, 'userHaveUsedTheApp');
    }
  }

  const addCard = (deckTitle, card) => {
    const newCard = new CardSchema(card.front, card.answer, card.type, card.multipleChoiceIncorrectAnswers);
    let indexOfDeck;
    for (indexOfDeck = 0; indexOfDeck < decks.length; indexOfDeck++) {
      let deck = decks[indexOfDeck];
      if (deck.title === deckTitle) {
        deck.cards.length === 0
          ? newCard.key = '0'
          : newCard.key = (+deck.cards[deck.cards.length - 1].key + 1).toString();
        break;
      }
    }

    const newDecks = [...decks];
    newDecks[indexOfDeck].cards.push(newCard);
    setDecks(newDecks);
    storeDecks(newDecks);
    setModalOpen(false);
  }

  const editCard = (deckTitle, editedCard) => {
    for (let deck of decks) {
      if (deck.title === deckTitle) {
        for (let card of deck.cards) {
          if (card.key === editedCard.key) {
            card.front = editedCard.front;
            card.answer = editedCard.answer;
            card.type = editedCard.type;
            card.multipleChoiceIncorrectAnswers = editedCard.multipleChoiceIncorrectAnswers;
            storeDecks(decks);
          }
        }
      }
    }
  }

  const deleteCard = (deckTitle, cardKey) => {
    const newDecks = [...decks];
    for (let deck of newDecks) {
      if (deck.title === deckTitle) {
        deck.cards = deck.cards.filter(card => card.key !== cardKey);
        storeDecks(newDecks);
        setDecks(newDecks);
      }
    }
  }

  const setNextReview = (deckTitle, cardKey, nextReview) => {
    const newDecks = [...decks];
    for (let deck of newDecks) {
      if (deck.title === deckTitle) {
        deck.cards.forEach(card => {
          if (card.key === cardKey) {
            card.lastReview = Date.now();
            card.nextReview = Date.now() + nextReview;
            storeDecks(newDecks);
            setDecks(newDecks);
          }
        });
      }
    }
  }

  const addDeck = (deckTitle) => {
    const newDeck = new DeckSchema(deckTitle);
    if (!decks) {
      setDecks([newDeck]);
    } else {
      if (deckTitle) {
        for (let deck of decks) {
          if (deckTitle === deck.title) {
            setPopUpNewDeck(false);
            return;
          }
        }
        setDecks([...decks, newDeck]);
      }
    }
    setPopUpNewDeck(false);
    setNewDeckName(null);
  }

  const deleteDeck = (titleDeckToDelete) => {
    const newDecks = decks.filter(deck => deck.title !== titleDeckToDelete);
    setDecks(newDecks);
    storeDecks(newDecks);
    setPopUpDeleteDeck(false);
    setDeckToDelete(null);
  }

  const storeDecks = async (newDatabase) => {
    await storeData(newDatabase, config.localDatabaseStorage);
  }

  const getDecks = async () => {
    const userDecks = await getData(config.localDatabaseStorage);
    setDecks(userDecks);
  }

  const cardsToStudy = (deck) => {
    return deck.cards.filter(card => card.nextReview < Date.now()).length;
  }


  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>My Decks</Text>
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name='close'
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(false)}
            />
            <AddOrEditCard />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {
        decks &&
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <View style={globalStyles.subContainer}>
              <TouchableOpacity
                onPress={() => navigation.push('DeckDetails', { item, addCard, editCard, deleteCard, setNextReview })}
                onLongPress={() => {
                  setPopUpDeleteDeck(true);
                  setDeckToDelete(item.title);
                }}
              >
                <Card>
                  <Text style={globalStyles.titleText}>{item.title}</Text>
                  {
                    cardsToStudy(item) !== 0 && <Text style={{ color: '#f01d71' }}>{cardsToStudy(item)}</Text>
                  }
                </Card>
              </TouchableOpacity>
            </View>
          )}
        />
      }
      <MaterialIcons
        name='add'
        size={24}
        style={{ ...styles.modalToggle, ...styles.modalClose }}
        onPress={() => setPopUpNewDeck(true)}
      />

      <Dialog.Container visible={popUpNewDeck}>
        <Dialog.Title>Deck title</Dialog.Title>
        <Dialog.Input
          placeholder='Write here the deck title...'
          onChangeText={(title) => setNewDeckName(title)}
        />
        <Dialog.Button label="Cancel" onPress={() => setPopUpNewDeck(false)} />
        <Dialog.Button label="Save" onPress={() => addDeck(newDeckName)} />
      </Dialog.Container>

      <Dialog.Container visible={popUpDeleteDeck}>
        <Dialog.Title>Do you want to delete this deck?</Dialog.Title>
        <Dialog.Description>You will lose all the cards.</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setPopUpDeleteDeck(false)} />
        <Dialog.Button label="Delete" onPress={() => deleteDeck(deckToDelete)} />
      </Dialog.Container>
    </View>
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
});

