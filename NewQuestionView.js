import React, { Component } from 'react';
import { View, DeviceEventEmitter, StyleSheet } from 'react-native';
import { Container, Input, Card, Title, Body, CardItem, Content, Toast, Form, Item, Button, Grid, H1, H2, H3, Text } from 'native-base';
import * as helpers from './helpers';

export default class NewQuestionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      answer: "",
    };
  }

  handleSubmit = async() => {

    const { question, answer } = this.state;
    const { navigation } = this.props;

    if (question == "" || answer == "") {
      return Toast.show({ text: 'Please type a Question and an Answer!', buttonText: 'Okay' })
    } else {
      const payload = {
        "question": question,
        "answer": answer
      }
      const isCardSaved = await helpers.addCardToDeck(navigation.getParam('id'), payload);
      if (isCardSaved) {
        DeviceEventEmitter.emit("deckUpdated", true);
        DeviceEventEmitter.emit("cardAdded", true);
        navigation.goBack();
      }
    }
  }

  render() {

    const { question, answer } = this.state;

    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <H1 style={styles.titleStyle}>Add a new Card</H1>
          <Form style={styles.formStyle}>
            <Item>
              <Input placeholder="Question" onChangeText={(el) => this.setState({ question: el })} />
            </Item>
            <Item last>
              <Input placeholder="Answer" onChangeText={(el) => this.setState({ answer: el })} />
            </Item>
            <Button block style={styles.buttonStyle} primary disabled={question == "" || answer == "" ? true : false} onPress={this.handleSubmit}>
              <Text>Submit</Text>
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
  formStyle: {
    width: 400,
    alignItems: 'center',
    justifyContent: 'center'
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