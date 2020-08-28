import React, { useState } from 'react';
import { View, Animated, Text, AsyncStorage } from 'react-native';
import { globalStyles } from './styles/globalStyles';
import config from './config';

const verifyAnswer = (userAnswer, card) => {
  return userAnswer === card.answer
    ? true
    : false
}

const showFadeMessage = (message) => {
  const fadeValue = new Animated.Value(1);
  Animated.timing(fadeValue, {
    toValue: 0, // 0 because after the 3000 ms it's not visible
    duration: 3000
  }).start();

  return (
    <View>
      <Animated.View
        style={{
          opacity: fadeValue,
          ...globalStyles.fadeMessage,
        }}
      >
        <Text>{message}</Text>
      </Animated.View>
    </View>
  )
}

const storeData = async (data, key) => {
  try {
    const jsonData = JSON.stringify(data);
    const a = await AsyncStorage.setItem(key, jsonData);
  } catch (e) {
    console.error("Couldn't store the data in the local database: ", e);
  }
}

const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    const parsedData = JSON.parse(data)
    return parsedData;
  } catch (e) {
    console.error("Couldn't get the data from the local database: ", e);
  }
}

const removeToken = async () => {
  await storeData(null, config.localTokenStorage);
}

export { verifyAnswer, showFadeMessage, storeData, getData, removeToken };