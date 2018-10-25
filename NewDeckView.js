import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Body, Toast, Text, Title, Button } from 'native-base';
import * as helpers from './helpers';
import { DeviceEventEmitter } from 'react-native';

export default class NewDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: ""
    };
  }

  handleSubmit = () => {

    const { deckTitle } = this.state;
    console.log("dentro de else")
    if (deckTitle == "" || deckTitle == undefined || deckTitle == null) {
      return Toast.show({ text: 'Please type a Deck Title!', buttonText: 'Okay' })
    } else {
      const isDeckSaved = helpers.saveDeckTitle(deckTitle);
      if (isDeckSaved) {
        DeviceEventEmitter.emit("deckUpdated", true);
      }
    }
  } 

  render() {
    const {deckTitle} = this.state;
    return (
      <Container>
        <Content>
          <Body>
            <Title>Tell us the title of your new Deck</Title>
          </Body>
          <Form>
            <Item last>
              <Input placeholder="Deck Title" onChangeText={(el) => this.setState({ deckTitle: el })} />
            </Item>
            <Button primary disabled={deckTitle == "" ? true : false} onPress={this.handleSubmit}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
