import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import LogIn from '../shared/LogIn';
import SignUp from '../shared/SignUp';
import UserProfile from '../shared/UserProfile';

export default function MyProfile ({ screenProps }) {
  const [componentToRender, setComponentToRender] = useState('LogIn');

  const { isAuthenticated, setIsAuthenticated } = screenProps;

  console.log('isAuthenticated: ', screenProps.isAuthenticated)

  return (
    <View >
      {
        componentToRender === 'LogIn' &&
        <LogIn
          setComponentToRender={setComponentToRender}
          setIsAuthenticated={setIsAuthenticated}
        >
        </LogIn>
      }
      {
        componentToRender === 'SignUp' &&
        <SignUp
          setComponentToRender={setComponentToRender}
          setIsAuthenticated={setIsAuthenticated}
        >
        </SignUp>
      }
      {
        (isAuthenticated || componentToRender === 'UserProfile') &&
        <UserProfile
          setComponentToRender={setComponentToRender}
          setIsAuthenticated={setIsAuthenticated}
        >
        </UserProfile>
      }
    </View>
  )
}