import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Keyboard, Animated, ScrollView } from 'react-native';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { List } from 'react-native-paper';

import { globalStyles } from '../styles/globalStyles';
import Button from '../shared/Button';
import { showFadeMessage } from '../sharedFunctions';

const reviewSchema = yup.object({
  front: yup.string().max(1000).required(),
  answer: yup.string().max(1000).required(),
});

const multipleChoiceSchema = yup.object({
  front: yup.string().max(1000).required(),
  answer: yup.string().max(1000).required(),
  // TODO: Fix error. Brokes when fill the last incorrect answer
  // multipleChoiceIncorrectAnswers: yup.array().of(
  //   yup.string().max(1000).required('this is a required field').typeError('this is a required field') // need to add typeError because I define that by default the initial value is [null, null, null] and null is not an string, that's why I need to handle that error this way or inside yup.string('Error message')
  // ),
});


export default function AddOrEditCard ({ navigation }) {
  const addCard = navigation.getParam('addCard');
  const card = navigation.getParam('item');
  const editCard = navigation.getParam('editCard');
  const deckTitle = navigation.getParam('deckTitle');
  const [fadeMessage, setFadeMessage] = useState(false);
  const [type, setType] = useState(card ? card.type : 'Remember card');
  const [expandedList, setExpandedList] = useState(false);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{ front: addCard ? '' : card.front, answer: addCard ? '' : card.answer, type: addCard ? type : card.type, multipleChoiceIncorrectAnswers: addCard ? [null, null, null] : card.multipleChoiceIncorrectAnswers }}
            validationSchema={type === 'Multiple choice card' ? multipleChoiceSchema : reviewSchema}
            onSubmit={(values, actions) => {
              if (addCard) { // if addCard func doesn't exist then this component was called to edit the card not to add a new card
                Keyboard.dismiss();
                addCard(deckTitle, values);
                actions.resetForm();
              } else {
                Keyboard.dismiss();
                const editedCard = {
                  key: card.key,
                  ...values,
                }
                if (editedCard.type !== 'Multiple choice card')
                  editedCard.multipleChoiceIncorrectAnswers = [null, null, null];
                editCard(deckTitle, editedCard);
              }
              setFadeMessage(addCard  // save into fadeMessage variable the fade message component
                ? showFadeMessage('Card created')
                : showFadeMessage('Card modified')
              )
            }}
          >
            {
              (formikProps) => (
                <>
                  <View>
                    <View>
                      <List.Section key='ListSection1'>
                        <List.Accordion
                          key='ListAccordion1'
                          title={formikProps.values.type}
                          left={props => <List.Icon key='ListIcon' {...props} icon="card-text-outline" />}
                          onPress={() => setExpandedList(!expandedList)}
                          expanded={expandedList}
                          theme={{ colors: { primary: '#00a2e8' } }}
                        >
                          <List.Item
                            key='ListItemRememberCard'
                            title="Remember card"
                            onPress={() => {
                              setType('Remember card')
                              setExpandedList(!expandedList)
                              formikProps.handleChange('type')("Remember card")
                            }}
                          />
                          <List.Item
                            key='ListItemFillCard'
                            title="Fill card"
                            onPress={() => {
                              setType('Fill card')
                              setExpandedList(!expandedList)
                              formikProps.handleChange('type')("Fill card")
                            }}
                          />
                          <List.Item
                            key='ListItemMultipleChoiceCard'
                            title="Multiple choice card"
                            onPress={() => {
                              setType('Multiple choice card')
                              setExpandedList(!expandedList)
                              formikProps.handleChange('type')("Multiple choice card")
                            }}
                          />
                        </List.Accordion>
                      </List.Section>
                    </View>
                    <TextInput
                      key='front'
                      multiline
                      placeholder='front'
                      style={globalStyles.input}
                      value={formikProps.values.front}
                      onChangeText={formikProps.handleChange('front')}
                      onBlur={formikProps.handleBlur('front') /* to do a real time validation. Needed to display the error message if user is in front field and touch somewhere else */}
                    />
                    <Text key='errorMessageFront' style={globalStyles.errorText}>{formikProps.touched.front && formikProps.errors.front /* If user have touched front field and there don't pass the validation THEN will show a message saying why is not passing the validation */}</Text>
                    {
                      type === 'Multiple choice card'
                        ? <>
                          <Text
                            key='titleCorrectAnswer'
                            style={{ ...globalStyles.titleText, ...globalStyles.greenColor, marginBottom: 20 }}
                          >Correct answer:</Text>
                          <TextInput
                            key={'correctAnswer'}
                            multiline
                            placeholder={'Write here the correct answer...'}
                            style={globalStyles.input}
                            value={formikProps.values.answer}
                            onChangeText={formikProps.handleChange('answer')}
                            onBlur={formikProps.handleBlur('answer')}
                          />
                          <Text key='errorMessageCorrectAnswer' style={globalStyles.errorText}>{formikProps.touched.answer && formikProps.errors.answer /* If user have touched front field and there don't pass the validation THEN will show a message saying why is not passing the validation */}</Text>
                          <Text
                            key='titleIncorrectAnswers'
                            style={{ ...globalStyles.titleText, ...globalStyles.redColor, marginTop: 30, marginBottom: 20 }}
                          >Incorrect answers:</Text>
                          {
                            [1, 2, 3].map((_, i) => (
                              <>
                                <TextInput
                                  key={`incorrectAnswer${i}`}
                                  multiline
                                  placeholder={'Write here a not correct answer...'}
                                  style={globalStyles.input}
                                  value={formikProps.values.multipleChoiceIncorrectAnswers[i]}
                                  onChangeText={formikProps.handleChange(`multipleChoiceIncorrectAnswers[${i}]`)}
                                  onBlur={formikProps.handleBlur(`multipleChoiceIncorrectAnswers[${i}]`)}
                                />
                                <Text key={`errorMessageIncorrectAnswer${i}`} style={globalStyles.errorText}>{formikProps.touched.multipleChoiceIncorrectAnswers && formikProps.errors.multipleChoiceIncorrectAnswers}</Text>
                              </>
                            ))
                          }
                        </>
                        : <>
                          <TextInput
                            key='correctAnswer2'
                            multiline
                            placeholder='answer'
                            style={globalStyles.input}
                            value={formikProps.values.answer}
                            onChangeText={formikProps.handleChange('answer')}
                            onBlur={formikProps.handleBlur('answer')}
                          />
                          <Text key='errorMessageIncorrectAnswer2' style={globalStyles.errorText}>{formikProps.touched.answer && formikProps.errors.answer}</Text>
                        </>
                    }
                    <Button
                      key='saveButton'
                      text='Save'
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                  {
                    addCard
                      ? <Text key='nextReviewMessage' style={styles.text}>First review now</Text>
                      : <Text key='nextReviewMessage2' style={styles.text}>Next review: {moment(card.nextReview).calendar()}</Text>
                  }
                </>
              )
            }
          </Formik>
        </View>
        {
          fadeMessage
        }
      </View >
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text,
    textAlign: 'center',
    color: 'lightgray',
    marginTop: 10,
  }
});