import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TabsBar from './TabsBar';
import { Container, Header, Content } from 'native-base';
import { createStackNavigator,createBottomTabNavigator } from 'react-navigation';
import DeckListView from './DeckListView';
import NewDeckView from './NewDeckView';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <AppStackNavigator />
        <TabsBottomNavigation/>
      </Container>

    );
  }
}

const AppStackNavigator = createStackNavigator({
  DeckListView: {
    screen: DeckListView
  },
  NewDeckView: {
    screen: NewDeckView
  }


})

const TabsBottomNavigation = createBottomTabNavigator({
  TabsBar: {
    screen: TabsBar
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
