import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { globalStyles } from '../styles/globalStyles';
import Button from './Button';
import apiClient from '../apiClient';
import { storeData } from '../sharedFunctions';
import config from '../config';


const reviewSchema = yup.object({
  username: yup.string().min(4).max(10).required(),
  password: yup.string().min(8).max(20).required(),
  email: yup.string().email().max(40).required(),
  gender: yup.string().required(),
  birthdate: yup.date().max(new Date(), "You can't be born in the future!").typeError('birthdate is a required field').required(),
});

const radio_props = [
  { label: 'Male', value: 'true' },
  { label: 'Female', value: 'false' }
];


export default function SignUp ({ setComponentToRender, setIsAuthenticated }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const register = async (user) => {
    const res = await apiClient.register(user);

    if (res === 'Email is already used')
      Alert.alert('Ooops!', `${user.email} is already used. Please change it.`);
    else {
      const token = res;
      storeData(token, config.localTokenStorage);
      setIsAuthenticated(true);
      setComponentToRender('UserProfile');
    }
  }

  return (
    <ScrollView>
      <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
        <Formik
          initialValues={{ username: '', password: '', email: '', gender: '', birthdate: 'Pick your birthdate' }}
          validationSchema={reviewSchema}
          onSubmit={(values) => {
            Keyboard.dismiss();
            register(values);
          }}
        >
          {
            (formikProps) => (
              <>
                <View>
                  <Text style={globalStyles.title}>Sign Up</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Your email...'
                    value={formikProps.values.email}
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                  <Text style={globalStyles.errorText}>{formikProps.touched.email && formikProps.errors.email}</Text>
                  <TextInput
                    style={globalStyles.input}
                    secureTextEntry
                    placeholder='Your password...'
                    value={formikProps.values.password}
                    onChangeText={formikProps.handleChange('password')}
                    onBlur={formikProps.handleBlur('password')}
                  />
                  <Text style={globalStyles.errorText}>{formikProps.touched.password && formikProps.errors.password}</Text>
                  <TextInput
                    style={globalStyles.input}
                    placeholder='Your username...'
                    value={formikProps.values.username}
                    onChangeText={formikProps.handleChange('username')}
                    onBlur={formikProps.handleBlur('username')}
                  />
                  <Text style={globalStyles.errorText}>{formikProps.touched.username && formikProps.errors.username}</Text>
                </View>
                <RadioForm
                  radio_props={radio_props}
                  initial={-1}  // to not select any at the beginning
                  value={formikProps.values.gender}
                  style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                  buttonSize={12}
                  buttonColor={'#00a2e8'}
                  onPress={formikProps.handleChange('gender')}
                />
                <Text style={globalStyles.errorText}>{formikProps.touched.username && formikProps.errors.gender}</Text>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name="calendar" style={globalStyles.icon} />
                    <Text placeholder='Pick your birthdate'>
                      {formikProps.values.birthdate}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Text style={globalStyles.errorText}>{formikProps.touched.birthdate && formikProps.errors.birthdate}</Text>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={(date) => {
                    setDatePickerVisibility(false);
                    date = moment(date).format('LL');
                    formikProps.handleChange('birthdate')(date);
                  }}
                  onCancel={() => setDatePickerVisibility(false)}
                />
                <Button
                  text='Sing Up'
                  onPress={formikProps.handleSubmit}
                />
                <TouchableOpacity onPress={() => setComponentToRender('LogIn')}>
                  <Text style={globalStyles.link}>
                    Log In here!
                </Text>
                </TouchableOpacity>
              </>
            )
          }
        </Formik>
      </View>
    </ScrollView>
  )
}
