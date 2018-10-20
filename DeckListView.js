import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Button, Body } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import * as helpers from './helpers';

export default class DeckListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks:[]
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

  async componentDidMount (){
    let result = await helpers.getDecks();
    if(result != null){
      result = Object.values(JSON.parse(result));
      this.setState({decks: result});
    }
  }

  navigateToDeck = (id) => {

  } 

  render() {
    
    const {decks} = this.state;
    
    return (
      <Container>
        <Content>
          <Grid>
            {decks.map(card =>
              <Col key={card.id}>
                <Card>
                  <CardItem header button onPress={(id) => this.navigateToDeck(id)}>
                    <Text style={styles.textColor}>{card.title}</Text>
                  </CardItem>
                  <CardItem>
                    <Body>
                      {/* <Text>{card.cardNum}</Text> */}
                    </Body>
                  </CardItem>
                </Card>
              </Col>
            )}
          </Grid>
        </Content>
      </Container>
    );
  }
}

function getDecks(){
  const res = helpers.getDecks();
  console.log(res, "RESULT");
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyles:{
    backgroundColor: 'rgb(50, 49, 78)',
    color: 'white'
  },
  textColor:{
    color: 'rgb(50, 49, 78)'
  }
});
