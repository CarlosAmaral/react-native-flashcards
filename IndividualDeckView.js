import React, { Component } from 'react';
import { StyleSheet, DeviceEventEmitter } from 'react-native';
import { Container, Card, CardItem, Content, Button, Text } from 'native-base';
import * as helpers from './helpers';

export default class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    //title: 'Kewl',
    //headerTitleStyle: { textAlign: 'center', alignSelf: 'center' }
  });

  constructor(props) {
    super(props);
    this.state = {
      deck: {}
    };
  }

  _fetchDeck = async() => {
    const { navigation } = this.props;
    const deck = await helpers.getDeck(navigation.getParam('id'))

    if (deck != {}) {
      return this.setState({ deck })
    }
  }

  componentDidMount() {
    DeviceEventEmitter.addListener("cardAdded", (e) => {
      return this._fetchDeck();
    })
    return this._fetchDeck();
  }

  render() {

    const { deck } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <Container>
        {helpers.isEmpty(deck) ? (
          <Text>Loading</Text>
        ) : (
            <Content contentContainerStyle={styles.container}>
                <Card key={deck.id} style={styles.cardStyle}>
                  <CardItem header>
                    <Text style={styles.textColor}>
                      {deck.title}
                    </Text>
                  </CardItem>
                  <CardItem>
                      <Text>
                        {deck.questions.length} cards
                      </Text>
                  </CardItem>
                </Card>
              <Button style={styles.buttonStyle} onPress={() => navigate('NewQuestion', { id: deck.id })}>
                <Text>Add Card</Text>
              </Button>
              <Button style={styles.buttonStyle} success onPress={() => navigate('Quiz', { id: deck.id })}>>
                  <Text>Start Quiz</Text>
                </Button> 
            </Content>
          )}
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  titleStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center'
  },
  cardStyle:{
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height:150
  },
  buttonStyle: {
    alignSelf: 'center',
    marginTop: 20
  },
  container: {
    flex: 1,
    //backgroundColor: 'rgb(50, 49, 78)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardStyles: {
    backgroundColor: 'rgb(50, 49, 78) !important',
    color: 'white'
  },
  textColor: {
    color: 'rgb(50, 49, 78)'
  }
});