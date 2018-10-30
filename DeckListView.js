import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Header, Left, Right, Card, CardItem, Text, Title, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {getDecks} from './helpers';
import { DeviceEventEmitter } from 'react-native';

export default class DeckListView extends Component {


  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      animation: false,
    };
  }
  /**
   * Fetch All Decks
   */
  _fetchDecks = async () => {
    let result = await getDecks();
    if (result != null) {
      result = Object.values(result);
      this.setState({ decks: result });
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener("deckUpdated", (e) => {
      console.log("DECK UPDATED")
      return this._fetchDecks();

    })
    return this._fetchDecks();
  }

  NavIndividualDeck = (id) => {
    const { navigate } = this.props.navigation;

    setTimeout(() => {
      this.setState({ animation: true })
    }, 1000)
    this.setState({ animation: false })

    setTimeout(() => {
      navigate('IndividualDeck', { id: id })
    }, 1000)
  }

  render() {

    const { decks } = this.state;
    return (
      <Container style={this.state.animation ? { backgroundColor: 'rgb(50, 49, 78)' } : { backgroundColor: '#000' }}>
        <Content>
          <Grid>
            {decks.map(card =>
              <Row key={card.id}>
                <Col>
                  <Card button>
                    <CardItem header button onPress={() => this.NavIndividualDeck(card.id)}>
                      <Text style={styles.textColor}>
                        {card.title}
                      </Text>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                          {card.questions.length} cards
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
    backgroundColor: 'rgb(50, 49, 78)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyles: {
    backgroundColor: 'rgb(50, 49, 78) !important',
    color: 'white'
  },
  textColor: {
    color: 'rgb(50, 49, 78)'
  }
});
