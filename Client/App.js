import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';  /* to get the necessary methods to load my custom fonts */
import { AppLoading } from 'expo';  /* component that will be shown while the app is fetching data and is not ready */
import Navigator from './routes/drawer';

const getFonts = () => Font.loadAsync({   /* Loads the fonts asynchronously */
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function App () {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);   // this needs to be here, have to see how pass it throw the navigator
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
        onFinish={() => setFontsLoaded(true)}   /* when finish loading the fonts change the flag's value */
      />
    )
  }
}