import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Keyboard, Image } from 'react-native';

import { globalStyles } from '../styles/globalStyles';
import ButtonGray from './ButtonGray';
import apiClient from '../apiClient';
import { removeToken } from '../sharedFunctions';


export default function UserProfile ({ setIsAuthenticated, setComponentToRender }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    apiClient.profile()
      .then(data => {
        setUser(data);
      });
  }

  const handleLogout = async () => {
    await removeToken();
    setIsAuthenticated(false);
    setComponentToRender('LogIn');
  }

  return (
    <ScrollView>
      {
        user &&
        <>
          <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={require('../assets/user3.png')}
                style={styles.headerImage}
              />
              <Text style={styles.userName}>{user.username}</Text>
              <Text style={globalStyles.userData}>{user.gender ? 'Male' : 'Female'}</Text>
              <Text style={globalStyles.userData}>{user.email}</Text>
            </View>
            <ButtonGray
              title='Log out'
              onPress={handleLogout}
            >
            </ButtonGray>
          </View>
        </>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 170,
    marginHorizontal: 10,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  userName: {
    ...globalStyles.userData,
    ...globalStyles.geniusColor,
    fontSize: 30,
    fontWeight: '900',
  }
});