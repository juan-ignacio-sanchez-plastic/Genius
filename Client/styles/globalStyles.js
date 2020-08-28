import { StyleSheet } from 'react-native';

const geniusColor = '#00a2e8';
const redColor = '#f01d71';
const greenColor = '#0ead69';

export const backgroundUri = "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  titleText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
  },
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    color: '#333',
  },
  title: {
    color: geniusColor,
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  fadeMessage: {
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    backgroundColor: "lightgray",
  },
  geniusColor: {
    color: geniusColor,
  },
  iconColor: {
    color: geniusColor,
  },
  icon: {
    fontSize: 40,
    color: geniusColor,
    margin: 10,
  },
  redColor: {
    color: redColor,
  },
  greenColor: {
    color: greenColor,
  },
  link: {
    fontSize: 16,
    color: geniusColor,
    textAlign: 'center',
    marginTop: 25,
  },
  userData: {
    fontSize: 18,
    margin: 5,
  },
  backgroundStyle: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
});
