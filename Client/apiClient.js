import config from './config';
import { getData } from './sharedFunctions';
import { Alert } from 'react-native';

const baseURL = 'http://192.168.0.12:3200/';


function fetchData (endpoint, options) {
  return fetch(`${baseURL}${endpoint}`, options)
    .then(res => res.status !== 204 ? res.json() : res)
    .catch(err => {
      console.error(`Error fetching ${baseURL}${endpoint} with method ${options ? options.method : 'GET'}`);
      console.error('Error: ', err);
    });
}

function login (body) {
  return fetchData('login', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function register (body) {
  return fetchData('register', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

async function profile () {
  const token = await getData(config.localTokenStorage);

  return fetchData(`me`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}

function getAllCommunityDecks () {
  return fetchData('decks', {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  });
}

async function shareDeck (deck) {
  const token = await getData(config.localTokenStorage);

  if (!token) return Alert.alert('Ooops!', 'You must log in to share your deck with the community');

  return fetchData('deck', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(deck),
  });
}

async function downloadDeck (key) {
  const token = await getData(config.localTokenStorage);

  if (!token) return Alert.alert('Ooops!', 'You must log in to download a deck');

  return fetchData(`deck/${key}`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
}

export default { fetchData, login, register, profile, getAllCommunityDecks, shareDeck, downloadDeck };
