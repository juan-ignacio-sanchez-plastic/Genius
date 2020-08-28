import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import Card from '../shared/Card';
import { showFadeMessage } from '../sharedFunctions';

export default function CommunityDeckDetails ({ navigation }) {
  const deck = navigation.getParam('item');
  const handleDownload = navigation.getParam('handleDownload');
  const [fadeMessage, setFadeMessage] = useState(false);


  return (
    <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
      <Text style={{ ...globalStyles.titleText, textAlign: "center" }}>{deck.title}</Text>
      <TouchableOpacity onPress={() => navigation.push('DeckAllCards', { deck })}>
        <Card>
          <Text style={{ flex: 1, textAlign: 'center' }}>{deck.cards.length} cards</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: "center", marginBottom: 20 }}>
          <Text
            onPress={() => navigation.push('DeckAllCards', { deck })}
            style={styles.text}
          >See all cards</Text>
        </View>
      </TouchableOpacity>
      <Button
        title='Download'
        onPress={() => {
          handleDownload(deck.key);
          setFadeMessage(showFadeMessage('Deck downloaded'));
        }}
      />
      {
        fadeMessage
      }
    </View >
  )
}

// Estos estilos se repiten en Home, son los del "+", puedo sinó crear un componente para los "+"
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