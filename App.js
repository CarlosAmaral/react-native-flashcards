import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import TabsBar from './TabsBar';
import { Container, Header, Content } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import DeckListView from './DeckListView';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header />
        <AppStackNavigator />
        <TabsBar />

      </Container>

    );
  }
}

const AppStackNavigator = createStackNavigator({
  DeckListView: {
    screen: DeckListView
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
