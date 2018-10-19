import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Container, CardItem, Body, Text } from 'native-base';
import { black } from 'ansi-colors';

const deckData = [
  {
    title: "Deck Title 1",
    cardNum: 4
  }, {
    title: "Deck Title 2",
    cardNum: 1
  }, {
    title: "Deck Title 3",
    cardNum: 8
  }, {
    title: "Deck Title 4",
    cardNum: 10
  }
]

export default class DeckListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Container style={styles.container}>
        {deckData.map(deck => {
          <Card>
            <CardItem header>
              <Text style={styles.textColor}>{deck.title}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {deck.cardNum}
                </Text>
              </Body>
            </CardItem>
          </Card>
        })}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textColor: {
    color: 'black'
  }
});
