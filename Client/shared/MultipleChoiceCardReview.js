import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Keyboard, ScrollView } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Formik } from 'formik';

import Button from './Button';
import { verifyAnswer } from '../sharedFunctions';
import Card from '../shared/Card';


export default function MultipleChoiceCardReview ({ card, verifyUserAnswer, cardStatus, setCardStatus }) {
  const { showAnswer, isAnswerCorrect } = cardStatus;
  const radio_props = [
    { label: card.answer, value: card.answer },
    { label: card.multipleChoiceIncorrectAnswers[0], value: card.multipleChoiceIncorrectAnswers[0] },
    { label: card.multipleChoiceIncorrectAnswers[1], value: card.multipleChoiceIncorrectAnswers[1] },
    { label: card.multipleChoiceIncorrectAnswers[2], value: card.multipleChoiceIncorrectAnswers[2] },
  ];

  return (
    <ScrollView>
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
                <View>
                  <RadioForm
                    radio_props={radio_props}
                    initial={-1}  // to not select any at the beginning
                    value={formikProps.values.userAnswer}
                    onPress={formikProps.handleChange('userAnswer')}
                    buttonSize={12}
                    animation={false}
                    style={{ marginVertical: 20, height: 150, justifyContent: 'space-between' }}
                  />
                  <Button
                    text='Verify'
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              }
            </>
          )
        }
      </Formik>
    </ScrollView>
  )
}