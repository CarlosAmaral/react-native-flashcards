import React, { Component } from 'react';
import { View, DeviceEventEmitter } from 'react-native';
import { Container, Input, Card, Title, Body, CardItem, Content,Toast, Form, Item, Button, Grid, H1, H2, H3, Text } from 'native-base';
import * as helpers from './helpers';

export default class NewQuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question:"",
      answer:"",
    };
  }

  handleSubmit = () => {

    const { question, answer } = this.state;
    const { navigation } = this.props;
    console.log("dentro de else")
    if (question == "" || answer == "") {
      return Toast.show({ text: 'Please type a Question and an Answer!', buttonText: 'Okay' })
    } else {
      const payload = {
        "question": question,
        "answer": answer
      }
      const isCardSaved = helpers.addCardToDeck(navigation.getParam('id'), payload);
      /* if (isCardSaved) {
        DeviceEventEmitter.emit("deckUpdated", true);
      } */
    }
    

  }

  render() {
    const {question, answer} = this.state;

    return (
      <Container>
      <Content>
        <Body>
          <Title>Add a new Card</Title>
        </Body>
        <Form>
          <Item>
            <Input placeholder="Question" onChangeText={(el) => this.setState({ question: el })} />
          </Item>
          <Item last>
            <Input placeholder="Answer" onChangeText={(el) => this.setState({ answer: el })} />
          </Item>
          <Button primary disabled={question == "" || answer == ""  ? true : false} onPress={this.handleSubmit}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
    );
  }
}

