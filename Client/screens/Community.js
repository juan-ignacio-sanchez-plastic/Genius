import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import Card from '../shared/Card';
import apiClient from '../apiClient';
import { showFadeMessage } from '../sharedFunctions';

export default function Community ({ navigation, screenProps }) {
  const { decks, setDecks } = screenProps;
  const [communityDecks, setCommunityDecks] = useState(null);
  const [fadeMessage, setFadeMessage] = useState(false);

  const handleDownload = async (key) => {
    const downloadedDeck = await apiClient.downloadDeck(key);
    if (downloadedDeck) {
      setDecks([...decks, downloadedDeck]);
      setFadeMessage(showFadeMessage('Deck downloaded'));
    }
  }

  const loadDecks = async () => {
    apiClient.getAllCommunityDecks()
      .then(decks => setCommunityDecks(decks));
  }

  useEffect(() => {
    loadDecks();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={<Text style={{ ...globalStyles.titleText, textAlign: 'center', marginTop: 20 }}>Shared by the Community</Text>}
        data={communityDecks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 20, marginBottom: 5 }}>
            <TouchableOpacity
              onPress={() => navigation.push('CommunityDeckDetails', { item, handleDownload })}
            >
              <Card>
                <View style={{ flex: 1 }}>
                  <Text style={{ ...globalStyles.titleText, marginBottom: 10 }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity>
                      <Text style={globalStyles.geniusColor}>
                        {item.author}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDownload(item.key)}>
                      <Text style={globalStyles.geniusColor}>
                        Download
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        )}
      />
      {
        fadeMessage
      }
    </View>
  )
}