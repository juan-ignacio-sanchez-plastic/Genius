import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, Animated } from 'react-native';
import config from '../config';

import { globalStyles } from '../styles/globalStyles';
import MultipleChoiceCardReview from '../shared/MultipleChoiceCardReview';
import RememberCardReview from '../shared/RememberCardReview';
import FillCardReview from '../shared/FillCardReview';
import { showFadeMessage } from '../sharedFunctions';
import { ScrollView } from 'react-native-gesture-handler';

const initialState = {
  showAnswer: false,
  isAnswerCorrect: false,
};

export default function CardDetails ({ navigation }) {
  const [showIntervals, setShowIntervals] = useState(false);
  const [cardsToStudy, setCardsToStudy] = useState(navigation.getParam('cardsToStudy'));
  const setNextReview = navigation.getParam('setNextReview');
  const deckTitle = navigation.getParam('deckTitle');
  const [fadeMessage, setFadeMessage] = useState(false);
  const [cardStatus, setCardStatus] = useState(initialState);
  const intervals = {
    again: null,
    hard: null,
    good: null,
    easy: null,
  };

  const setIntervals = () => {
    const reviewInterval = cardsToStudy[0].nextReview - cardsToStudy[0].lastReview;
    if (reviewInterval === 0) {
      intervals.good = 6e+5;
    } else if (reviewInterval <= 6e+5) {   // 10 min
      intervals.good = 7.2e+6;
    } else if (reviewInterval <= 7.2e+6) {  // 2 hours
      intervals.good = 8.64e+7;
    } else if (reviewInterval <= 8.64e+7) {   // 1 day
      intervals.good = 1.728e+8;
    } else if (reviewInterval <= 1.728e+8) {  // 2 days
      intervals.good = 2.592e+8;
    } else if (reviewInterval <= 2.592e+8) { // 3 days
      intervals.good = 4.32e+8;
    } else if (reviewInterval > 4.32e+8) { // 5 days
      intervals.good = 8.64e+8;
    } else if (reviewInterval > 8.64e+8) { // 10 days
      intervals.good = reviewInterval + 8.64e+8;
    }
    intervals.easy = intervals.good * config.easy;
    intervals.hard = intervals.good * config.hard;
    intervals.again = reviewInterval === 0 ? 0 : 6e+5;   // 10 min
  };

  const invervalFormatted = (time) => {
    if (time < 3.6e+6) {  // 1 hour
      return `${Math.round(time / 6e+4)} minutes`;
    }
    if (time < 7.2e+6) {  // 2 hours
      return '1 hour';
    }
    if (time < 8.64e+7) {  // 1 day
      return `${Math.round(time / 3.6e+6)} hours`;
    }
    if (time < 1.728e+8) { // 2 days
      return '1 day';
    }
    if (time < 2.628e+9) { // 1 month
      return `${Math.round(time / 8.64e+7)} days`;
    }
    if (time < 5.256e+9) { // 2 months
      return '1 month';
    }
    if (time < 3.154e+10) {  // 1 year
      return `${Math.round(time / 2.628e+9)} months`;
    }
    if (time < 6.307e+10) {  // 2 year
      return '1 year';
    }
    if (time >= 6.307e+10) {  // 2 year
      return `${Math.round(time / 3.154e+10)}`;
    }
  }

  const setNextReviewAndCardsToStudy = (interval) => {
    Keyboard.dismiss();
    setNextReview(deckTitle, cardsToStudy[0].key, interval);
    setShowIntervals(false);
    cardsToStudy.shift();
    setCardsToStudy([...cardsToStudy]);
    setCardStatus(initialState);
  }

  const verifyUserAnswer = (userAnswer) => {
    Keyboard.dismiss();
    if (userAnswer) {
      setShowIntervals(true);
    } else {
      setFadeMessage(showFadeMessage('Wrong answer'));
    }
  }


  return <>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...globalStyles.container, ...globalStyles.subContainer }}>
        <View style={{ flex: 1 }}>
          {
            cardsToStudy.length === 0
              ? <View style={{ flex: 1, justifyContent: 'center', marginBottom: 40 }}>
                < Text style={styles.goodJob}>Good job!</Text>
                < Text style={styles.noMoreCards}>No more cards to study</Text>
              </View>
              : <>
                {setIntervals()}
                {
                  cardsToStudy[0].type === 'Remember card'
                  && <RememberCardReview
                    card={cardsToStudy[0]}
                    verifyUserAnswer={verifyUserAnswer}
                    cardStatus={cardStatus}
                    setCardStatus={setCardStatus}
                  />
                }
                {
                  cardsToStudy[0].type === 'Fill card'
                  && <FillCardReview
                    card={cardsToStudy[0]}
                    verifyUserAnswer={verifyUserAnswer}
                    cardStatus={cardStatus}
                    setCardStatus={setCardStatus}
                  />
                }
                {
                  cardsToStudy[0].type === 'Multiple choice card'
                  && <MultipleChoiceCardReview
                    card={cardsToStudy[0]}
                    verifyUserAnswer={verifyUserAnswer}
                    cardStatus={cardStatus}
                    setCardStatus={setCardStatus}
                  />
                }
              </>
          }
        </View>
        {
          fadeMessage
        }
      </View>
    </ScrollView>
    {
      showIntervals &&
      <View style={styles.buttonsConteiner}>
        <TouchableOpacity onPress={() => setNextReviewAndCardsToStudy(intervals.again)} style={[styles.buttonText, { backgroundColor: '#e63946' }]}>
          <View>
            <Text style={styles.perception}>Again</Text>
            <Text style={styles.interval}>{invervalFormatted(intervals.again) === '0 minutes' ? 'Now' : invervalFormatted(intervals.again)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNextReviewAndCardsToStudy(intervals.hard)} style={[styles.buttonText, { backgroundColor: '#A7A7A7' }]}>
          <View>
            <Text style={styles.perception}>Hard</Text>
            <Text style={styles.interval}>{invervalFormatted(intervals.hard)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setNextReviewAndCardsToStudy(intervals.good)} style={[styles.buttonText, { backgroundColor: '#07B549' }]}>
          <View>
            <Text style={styles.perception}>Good</Text>
            <Text style={styles.interval}>{invervalFormatted(intervals.good)}</Text>
          </View>
        </TouchableOpacity >
        <TouchableOpacity onPress={() => setNextReviewAndCardsToStudy(intervals.easy)} style={[styles.buttonText, { backgroundColor: '#46E6FF' }]}>
          <View>
            <Text style={styles.perception}>Easy</Text>
            <Text style={styles.interval}>{invervalFormatted(intervals.easy)}</Text>
          </View>
        </TouchableOpacity >
      </View >
    }
  </>
}

const styles = StyleSheet.create({
  buttonsConteiner: {
    flexDirection: 'row',
    flex: 1,
  },
  buttonText: {
    alignSelf: 'flex-end',
    flex: 1,
    margin: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
  },
  perception: {
    textAlign: 'center',
  },
  interval: {
    fontSize: 12,
    textAlign: 'center',
  },
  goodJob: {
    ...globalStyles.text,
    ...globalStyles.geniusColor,
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
  },
  noMoreCards: {
    ...globalStyles.text,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20
  }
}); 