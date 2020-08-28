import React from 'react';
import { Text } from 'react-native';
import { Formik } from 'formik';

import Card from '../shared/Card';
import ButtonGray from '../shared/ButtonGray';


export default function RememberCardReview ({ card, verifyUserAnswer, cardStatus, setCardStatus }) {
  const { showAnswer } = cardStatus;

  return (
    <Formik
      initialValues={{ userAnswer: null }}
      onSubmit={() => {
        verifyUserAnswer(true);
        setCardStatus({ showAnswer: true, isAnswerCorrect: true });
      }}
    >
      {
        (formikProps) => (
          <>
            <Card>
              <Text>{card.front}</Text>
            </Card>
            {
              showAnswer
                ? <Card>
                  <Text>{card.answer}</Text>
                </Card>
                : <ButtonGray
                  title='Show answer'
                  onPress={formikProps.handleSubmit}
                />
            }
          </>
        )
      }
    </Formik>
  )
}
