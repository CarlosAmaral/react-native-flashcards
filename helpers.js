import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from 'expo';

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

    //console.log(result, "USER COLLEC")

    await AsyncStorage.setItem('decks', JSON.stringify(initialDecks));
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

/**
 * Add latest quiz info to the User item of Async Storage
 * @param {*} payload 
 */
export const addQuizAnswerToUserCollection = async (payload) => {
  try {
    await AsyncStorage.mergeItem('user', JSON.stringify(payload));
    clearLocalNotifications().then(setLocalNotification());
  } catch (error) {
    return null;
  }
}

/**
|--------------------------------------------------
| Local Notifications
|--------------------------------------------------
*/

function clearLocalNotifications() {
  return AsyncStorage.removeItem('quizNotification')
    .then(Notification.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
  return {
    title: 'Quiz Time!',
    body: 'You forgot to complete at least one Quiz today :)',
    ios: { sound: true, priority: 'high', sticky: false, vibrate: true },
    android: { sound: true, priority: 'high', sticky: false, vibrate: true },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem('quizNotification')
    .then(JSON.parse)
    .then(res => {
      if (res === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(async ({ status }) => {
            if (status === 'granted') {

              Notifications.cancelAllScheduledNotificationsAsync();

              const oneDay = 24 * 60 * 60 * 1000;
              const rightNow = new Date();

              const userCollection = await AsyncStorage.getItem('user');
              if (userCollection != null) {
                const getTimestamp = JSON.parse(userCollection)
                if (Math.round(Math.abs((rightNow.getTime() - getTimestamp.timestamp.getTime()) / (oneDay))) > 2) {
                  sendNotification()
                }
              } else {
                sendNotification()
              }
            }
          })
      }
    })

}

function sendNotification() {
  let today = new Date()
  today.setDate(today.getDate())
  today.setHours(18)
  today.setMinutes(0)

  Notifications.scheduleLocalNotificationAsync(
    createNotification(),
    {
      time: today,
      repeat: 'day'
    }
  )
  AsyncStorage.setItem('quizNotification', JSON.stringify(true));
}