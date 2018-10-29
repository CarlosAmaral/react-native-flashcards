import React, { Component } from 'react';
import { Root, Icon } from "native-base";
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DeckListView from './DeckListView';
import NewDeckView from './NewDeckView';
import IndividualDeckView from './IndividualDeckView';
import NewQuestionView from './NewQuestionView';
import QuizView from './QuizView';
import * as helpers from './helpers';

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
},
  {
    initialRouteName: 'Home',
  }
);



export default class App extends Component {

  componentDidMount() {
    helpers.setLocalNotification();
  }

  render() {
    return (
      <Root>
        <AppStackNavigator />
      </Root>
    );
  }
}