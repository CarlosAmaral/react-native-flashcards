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

const initialDecks = {
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

// User object collection to keep track of the answered questions
//const userObj = {}

  /**
   * Populates Async Storage as the app is initialized
   */
  (async () => {
    try {
      await AsyncStorage.setItem('decks', JSON.stringify(initialDecks));
      //await AsyncStorage.setItem('user', JSON.stringify(userObj));
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
export const saveDeckTitle = async (title) => {

  try {
    var obj = {};
    obj[title] = {
      id: guid(),
      title: title,
      questions: []
    }
    AsyncStorage.mergeItem('decks', JSON.stringify(obj))
    const value = await getDecks();
    if (value != null) {
      return Object.values(value).find(k => k.id === obj[title].id);
    }
  } catch (error) {
    return error;
  }
}

/**
 * POST: save Card to Deck, takes an id and an object with question and answer as keys
 * @param {*} id 
 * @param {*} card 
 */
export const addCardToDeck = async (id, card) => {
  try {
    const value = await getDecks();
    if (value != null) {
      Object.values(value).find(deck => deck.id === id).questions.push(card)
      AsyncStorage.setItem('decks', JSON.stringify(value));
    }
  } catch (error) {
    return null;
  }
}

export const addQuizAnswerToUserCollection = async (deckId, answer) => {
  try {
    const value = await getDecks();
    if (value != null) {

      // correct: number of flagged questions as correct
      // wrong: number of flagged questions as wrong
      const obj = {
        id: deckId,
        // correct:

      }
      Object.values(value).find(deck => deck.id === deckId).questions.push(card)
      AsyncStorage.mergeItem('user', JSON.stringify(value));
    }
  } catch (error) {
    return null;
  }
}
