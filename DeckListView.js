import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as helpers from './helpers';
import TabsBar from './TabsBar';
import { DeviceEventEmitter } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import NewDeckView from './NewDeckView';

export default class DeckListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  static navigationOptions = {
    title: 'Welcome to Decks Game',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  fetchDecks = () => {

  }

  // REFACTOR FUNCTION BELOW
  async componentDidMount() {
    DeviceEventEmitter.addListener("deckUpdated", async (e) => {
      let result = await helpers.getDecks();
      if (result != null) {
        result = Object.values(result);
        this.setState({ decks: result });
      }
    })
    console.log("SSDSDSDSDSD");
    let result = await helpers.getDecks();
    if (result != null) {
      result = Object.values(result);
      this.setState({ decks: result });
    }
  }

  navigateToDeck = (id) => {
    ///
  }

  render() {

    const { decks } = this.state;
    const { navigate } = this.props.navigation;
    console.log("navigate", navigate('NewDeckView'));
    return (
      <Container>
        <Content>
          <Grid>
            {decks.map(card =>
              <Row key={card.id}>
                <Col >
                  <Card>
                    <CardItem header button onPress={() => navigate('IndividualDeckView', { id: card.id })}>
                      <Text style={styles.textColor}>
                        {card.title}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                          {card.questions.length}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                </Col>
              </Row>
            )}

          </Grid>
        </Content>
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
  cardStyles: {
    backgroundColor: 'rgb(50, 49, 78)',
    color: 'white'
  },
  textColor: {
    color: 'rgb(50, 49, 78)'
  }
});
