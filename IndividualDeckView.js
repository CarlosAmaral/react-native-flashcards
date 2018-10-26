import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Card, Body, CardItem, Content, Button, Grid, H1, H2, H3, Text } from 'native-base';
import * as helpers from './helpers';

export default class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    //title: 'Kewl',
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' }
  });

  constructor(props) {
    super(props);
    this.state = {
      deck: {}
    };
  }
  async componentDidMount() {
    const { navigation } = this.props;
    const deck = await helpers.getDeck(navigation.getParam('id'))

    if (deck != {}) {
      console.log("invidivual", deck);
      this.setState({ deck })
    }
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
              <Grid>
                <Card key={deck.id} style={styles.container}>
                  <CardItem header>
                    <Text style={styles.textColor}>
                      {deck.title}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>
                        {deck.questions.length}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>

              </Grid>
              
              <Button onPress={() => navigate('NewQuestion', { id: deck.id })}>
                <Text>Add Card</Text>
              </Button>
              <Button success onPress={() => navigate('StartQuiz')}>>
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
    paddingLeft:40,
    paddingRight:40,
    textAlign:'center'
  },
  container: {
    //backgroundColor: 'rgb(50, 49, 78)',
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