import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Keyboard } from 'react-native';
import { Formik } from 'formik';
import { globalStyles } from '../styles/globalStyles';

import Button from './Button';
import { verifyAnswer } from '../sharedFunctions';
import Card from '../shared/Card';

export default function FillCardReview ({ card, verifyUserAnswer, cardStatus, setCardStatus }) {
  const { showAnswer, isAnswerCorrect } = cardStatus;

  return (
    <Formik
      initialValues={{ userAnswer: null }}
      onSubmit={({ userAnswer }) => {
        const isCorrect = verifyAnswer(userAnswer, card);
        verifyUserAnswer(isCorrect);
        if (isCorrect) setCardStatus({ showAnswer: true, isAnswerCorrect: true })
      }}
    >
      {
        (formikProps) => (
          <>
            <Card>
              <Text>{card.front}</Text>
            </Card>
            {
              showAnswer &&
              <Card>
                <Text>{card.answer}</Text>
              </Card>
            }
            {
              isAnswerCorrect ||
              <>
                <TextInput
                  multiline
                  style={globalStyles.input}
                  placeholder='Write your answer...'
                  onChangeText={formikProps.handleChange('userAnswer')}
                />
                <Button
                  text='Verify'
                  onPress={formikProps.handleSubmit}
                />
              </>
            }
            {
              !showAnswer &&
              <Text
                style={{ color: '#898888', textAlign: 'center', marginTop: 20 }}
                onPress={() => setCardStatus({ ...cardStatus, showAnswer: true })}
              >Show answer</Text>
            }
          </>
        )
      }
    </Formik>
  )
}
