import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import { globalStyles } from '../styles/globalStyles';
import Button from './Button';
import apliClient from '../apiClient';
import { storeData } from '../sharedFunctions';
import config from '../config';


const reviewSchema = yup.object({
  password: yup.string().min(8).max(20).required(),
  email: yup.string().email().max(40).required(),
});


export default function LogIn ({ setComponentToRender, setIsAuthenticated }) {

  const logIn = async (user) => {
    const res = await apliClient.login(user);

    if (res === 'Email or password incorrect')
      Alert.alert('Ooops!', 'Email or password incorrect');
    else {
      const token = res;
      console.log('Token recibido en Login:', token)
      await storeData(token, config.localTokenStorage);
      setIsAuthenticated(true);
      setComponentToRender('UserProfile');
    }
  }

  return (
    <ScrollView>
      <View style={{ ...globalStyles.subContainer, ...globalStyles.container }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={reviewSchema}
          onSubmit={(values) => {
            Keyboard.dismiss();
            logIn(values);
          }}
        >
          {
            (formikProps) => (
              <View>
                <Text style={globalStyles.title}>Log In</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder='Insert your email...'
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange('email')}
                />
                <Text style={globalStyles.errorText}>{formikProps.touched.password && formikProps.errors.email}</Text>
                <TextInput
                  style={globalStyles.input}
                  secureTextEntry
                  placeholder='Insert your password...'
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange('password')}
                />
                <Text style={globalStyles.errorText}>{formikProps.touched.email && formikProps.errors.password}</Text>
                <Button
                  text='Log In'
                  onPress={formikProps.handleSubmit}
                />
                <TouchableOpacity onPress={() => setComponentToRender('SignUp')}>
                  <Text style={globalStyles.link}>
                    Sign up here!
                  </Text>
                </TouchableOpacity>
              </View>
            )
          }
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#54BCFF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});