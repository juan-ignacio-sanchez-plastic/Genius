import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Dialog from "react-native-dialog";
import { NavigationEvents } from 'react-navigation';

import { globalStyles } from '../styles/globalStyles';
import Card from '../shared/Card';

export default function DeckAllCards ({ navigation }) {
  const deck = navigation.getParam('deck');
  const editCard = navigation.getParam('editCard');
  const deleteCard = navigation.getParam('deleteCard');
  const [popUpDeleteCard, setPopUpDeleteCard] = useState(false);
  const [keyOfCardToDelete, setKeyOfCardToDelete] = useState();
  const [updateFlatList, setUpdateFlatList] = useState();

  return (
    <View style={{ marginTop: 23 }}>
      <NavigationEvents
        onDidFocus={() => {
          setUpdateFlatList(Math.random());
        }}
      />
      < FlatList
        data={deck.cards}
        extraData={updateFlatList}
        renderItem={({ item }) => (
          <View style={globalStyles.subContainer}>
            <TouchableOpacity
              onPress={() => navigation.push('AddOrEditCard', { item, editCard, deckTitle: deck.title })}
              onLongPress={() => {
                setPopUpDeleteCard(true);
                setKeyOfCardToDelete(item.key);
              }}
            >

              <Card>
                <View style={{ ...globalStyles.titleText, flex: 1, alignItems: 'center' }}>
                  <Text>
                    {item.front}
                  </Text>
                  <Text style={styles.grayLine}>_____________________</Text>
                  <Text>
                    {item.answer}
                  </Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      />

      <Dialog.Container visible={popUpDeleteCard}>
        <Dialog.Title>Do you want to delete this card?</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={() => setPopUpDeleteCard(false)} />
        <Dialog.Button label="Delete" onPress={() => {
          deleteCard(deck.title, keyOfCardToDelete);
          setPopUpDeleteCard(false);
        }} />
      </Dialog.Container>
    </View >
  )
}

const styles = StyleSheet.create({
  grayLine: {
    textAlign: 'center',
    color: 'lightgray',
    marginBottom: 10,
    fontSize: 16,
  }
});