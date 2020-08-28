import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

import { globalStyles } from '../styles/globalStyles';


export default function About () {
  return (
    <ScrollView>
      <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
        <Text style={globalStyles.titleText}>Genius</Text>
        <Text>Genius is the perfect complement for your studies. Using the spaced study principle Genius will help you to remember the important things and improve your memory. </Text>
        <Text style={{ ...globalStyles.titleText, marginTop: 20 }}>Forgetting Curve</Text>
        <Image
          source={require('../assets/forgetting-curve.png')}
          style={styles.image}
        />
        <Text style={globalStyles.titleText}>With Genius</Text>
        <Image
          source={require('../assets/forgetting-curve-with-genius.png')}
          style={styles.image}
        />
        <Text style={styles.centerText}>This app was developed for you</Text>
        <Text style={styles.centerText}>to help you with your studies</Text>
        <Text style={{ ...styles.centerText, marginTop: 20, marginBottom: 20 }}>Is free and it always will be</Text>
        <Text style={{ ...styles.centerText, ...styles.startNow }}>Start now!</Text>
        <View>
          <Text style={{ ...styles.centerText, color: '#0283ba' }}>Become a</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 40, resizeMode: 'contain', marginRight: 5 }}
            />
            <Text style={styles.genius}>Genius</Text>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  centerText: {
    textAlign: 'center',
  },
  startNow: {
    fontSize: 30,
    color: '#f48c06',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  genius: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00a2e8'
  }
}); 
