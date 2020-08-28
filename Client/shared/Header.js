import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header ({ navigation, title }) {
  return (
    <ImageBackground style={styles.header}>
      <MaterialIcons
        name='menu'
        size={28}
        onPress={() => navigation.openDrawer()}
        style={styles.icon}
      />
      <View style={styles.headerTitle}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  headerImage: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    left: 0,
  }
});