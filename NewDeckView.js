import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Body, Toast, Text, Title, H1, Button } from 'native-base';
import * as helpers from './helpers';
import { DeviceEventEmitter, StyleSheet } from 'react-native';

export default class NewDeckView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deckTitle: ""
    };
  }

  handleSubmit = async() => {

    const { deckTitle } = this.state;
    const { navigate } = this.props.navigation;
    if (deckTitle == "") {
      return Toast.show({ text: 'Please type a Deck Title!', buttonText: 'Okay' })
    } else {
      const isDeckSaved = await helpers.saveDeckTitle(deckTitle);
      if (isDeckSaved) {
        console.log(isDeckSaved, "IS DECK SAVED")
        DeviceEventEmitter.emit("deckUpdated", true);
        this.setState({deckTitle:""})
        return navigate('IndividualDeck', { id: isDeckSaved.id })
      }
    }
  }

  render() {
    const { deckTitle } = this.state;
    return (
      <Container >
        <Content contentContainerStyle={styles.container}>
          <H1 style={styles.titleStyle}>Tell us the title of your new Deck</H1>
          <Form style={styles.formStyle}>
            <Item last>
              <Input placeholder="Deck Title" value={deckTitle} onChangeText={(el) => this.setState({ deckTitle: el })} />
            </Item>
            <Button style={styles.buttonStyle} primary disabled={deckTitle == "" ? true : false} onPress={this.handleSubmit}>
              <Text>Create Deck</Text>
            </Button>
          </Form>
        </Content>
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
  formStyle:{
    width: 400, 
    textAlign: 'center'
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
