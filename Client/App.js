import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function App () {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [decks, setDecks] = useState(null);

  if (fontsLoaded) {
    return (
      <Navigator
        screenProps={{
          isAuthenticated,
          setIsAuthenticated,
          decks,
          setDecks,
        }}
      />
    )
  } else {
    return (

      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    )
  }
}
