import React from 'react';
import { StyleSheet, View } from 'react-native';

// Here I'm saying that everything that is inside <View> </View> put it where is {props.childer} so inside of those 2 Views
// Is used to set styles
export default function Card (props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children /* props.children is everything that is inside <View> -> Children <- </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginVertical: 10,
  },
});