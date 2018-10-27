import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Container, Content, Header, Left, Right, Card, CardItem, Text, Title, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as helpers from './helpers';
import TabsBar from './TabsBar';
import { DeviceEventEmitter } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import NewDeckView from './NewDeckView';

export default class DeckListView extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Kewl',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' }
  });


  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      fadeAnim: new Animated.Value(0),
    };

  }

  _fetchDecks = async () => {
    let result = await helpers.getDecks();
    if (result != null) {
      result = Object.values(result);
      this.setState({ decks: result });
    }
  }

  // REFACTOR FUNCTION BELOW
  componentDidMount() {
    DeviceEventEmitter.addListener("deckUpdated", (e) => {
      return this._fetchDecks();
    })
    return this._fetchDecks();
  }

  NavIndividualDeck = (id) => {
    const { navigate } = this.props.navigation;
    /*  Animated.timing(this.state.xPosition, {
       toValue: 100,
       easing: Easing.back(),
       duration: 1000,
     }).start(); */
    return navigate('IndividualDeck', { id: id })
  }

  render() {

    const { decks } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Container>
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
