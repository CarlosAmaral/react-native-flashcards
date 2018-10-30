import React, { Component } from 'react';
import { Root } from 'native-base';
import Expo from 'expo';
import { setLocalNotification } from './helpers';
import {AppStackNavigator} from './routes';

export default class App extends Component {
  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    setLocalNotification();
  }

  render() {
    return (
      <Root>
        <AppStackNavigator />
      </Root>
    );
  }
}