import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import TabsBar from './TabsBar';
import { Root, Icon } from "native-base";
import { Container, Header, Content, Body, Title, Text } from 'native-base';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DeckListView from './DeckListView';
import NewDeckView from './NewDeckView';
import IndividualDeckView from './IndividualDeckView';
import NewQuestionView from './NewQuestionView';
import QuizView from './QuizView';

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckListView,
    navigationOptions: {
      tabBarIcon: () => <Icon type="MaterialCommunityIcons" size={200} name="view-module" />,
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarIcon: () => <Icon type="MaterialIcons" name="add-box" size={200} />,
      tabBarLabel: 'Add Deck',
    }
  }
}, {
    initialRouteName: 'DeckList',

  }
);

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeck: {
    screen: IndividualDeckView
  },
  NewQuestion: {
    screen: NewQuestionView,
  },
  Quiz: {
    screen: QuizView,
  },

}, {
    initialRouteName: 'Home',
  }
);



export default class App extends Component {

  componentDidMount() {
    //clearLocalNotifications().then(setLocalNotification());
  }

  render() {
    console.log("kewl");
    return (
      <Root>
        <AppStackNavigator />
      </Root>
    );
  }
}


/* 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */