import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TabsBar from './TabsBar';
import { Root } from "native-base";
import { Container, Header, Content } from 'native-base';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DeckListView from './DeckListView';
import NewDeckView from './NewDeckView';
import IndividualDeckView from './IndividualDeckView';
import NewQuestionView from './NewQuestionView';

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppStackNavigator />
      </Root>
    );
  }
}


const TabsStackNavigator = createBottomTabNavigator({
  "TabsBar": TabsBar,
  "NewDeckView": NewDeckView
})

const AppStackNavigator = createStackNavigator({
  "DeckListView": DeckListView,
  "IndividualDeckView": IndividualDeckView,
  "NewQuestionView": NewQuestionView,
  "initialRouteName": DeckListView
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
