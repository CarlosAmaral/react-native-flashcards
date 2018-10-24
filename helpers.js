import { React } from 'react';
import { AsyncStorage } from "react-native";

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * Check if object is empty
 */

export function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }

  return true;
}

const initialDeck = {
  React: {
    id: guid(),
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    id: guid(),
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

/**
 * Populates Async Storage as the app is initialized
 */
(async () => {
  try {
    await AsyncStorage.setItem('decks', JSON.stringify(initialDeck));
  } catch (error) {
    console.info("error", error);
  }
})()


/**
 * GET: fetch all Decks
 */
export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem('decks');
    if (value != null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.info("GET DECKS Error", error);
  }
}

/**
 * GET: fetch individual Deck
 */
export const getDeck = async (id) => {

  try {
    const value = await getDecks();
    if (value != null) {
      return Object.values(value).find(k => k.id === id);
    }
  } catch (error) {
    console.info("GET DECKS Error", error);
  }
}

/**
 * POST: save individual Deck
 * @param {*} title 
 */
export const saveDeckTitle = (title) => {

  try {
    var obj = {};
    obj[title] = {
      id: guid(),
      title: title,
      questions: []
    }
    AsyncStorage.mergeItem('decks', JSON.stringify(obj))
    return true;
  } catch (error) {
    return false;
  }
}

export const deleteDeck = async(id) => {

  try {
    const value = await getDecks();
    if (value != null) {
      
      return Object.values(value).find(k => k.id === id);
    }
  } catch (error) {
    console.info("GET DECKS Error", error);
  }
} 

/**
 * POST: save Card to Deck
 * @param {*} id 
 * @param {*} card 
 */
export const addCardToDeck = (id, card) => {
  
}