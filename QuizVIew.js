import React, { Component } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Body, Toast, Text, Title, H1, H2, H3, Button } from 'native-base';
import * as helpers from './helpers';

export default class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: [],
      currentQuestionIndex: 0,
      questions: [],
      showAnswer: false,
      endOfQuiz: false,
      correctQuestionsNum:0
    };
  }

  _fetchQuestions = async () => {
    const { navigation } = this.props;
    const deckId = navigation.getParam('id');
    const payload = await helpers.getDeck(deckId);

    if (payload) {
      const questions = payload.questions;
      return this.setState({ questions }, () => this.setCurrentQuestion());
    }
  }

  componentDidMount() {
    this.initialState = this.state;
    DeviceEventEmitter.addListener("cardAdded", (e) => {
      return this._fetchQuestions();
    })
    return this._fetchQuestions();
  }

  setCurrentQuestion() {
    const { currentQuestionIndex, questions } = this.state;
    if (questions.length > 0 && (currentQuestionIndex + 1 <= questions.length)) {
      this.setState({ currentQuestion: questions[currentQuestionIndex] });
    } else {

      const deckId = navigation.getParam('id');
      
      const payload = {
           id: deckId,
           correct: 0
      }
      helpers.addQuizAnswerToUserCollection(payload)
      this.setState({ endOfQuiz: true });
    }
  }

  restartQuiz = () => {
    this.setState(this.initialState);
    return this._fetchQuestions();
  }

  nextCard = (chosen) => {
    const { currentQuestionIndex } = this.state;

    this.setState({ currentQuestionIndex: currentQuestionIndex + 1, showAnswer: false }, () => this.setCurrentQuestion());
  }

  render() {
    const { questions, showAnswer, currentQuestion, endOfQuiz, currentQuestionIndex } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <Container>

        {questions.length === 0 ? (
          <Content contentContainerStyle={styles.container}>
            <H2>No Cards available in this Deck</H2>
          </Content>
        ) : (
            <Content contentContainerStyle={styles.container}>

              {!endOfQuiz ? (
                <Body style={styles.container}>
                  <Text style={styles.textStyles}>Question {currentQuestionIndex + 1} out of {questions.length}</Text>
                  <H3>
                    {currentQuestion.question}
                  </H3>

                  {!showAnswer ? (
                    <Button transparent info style={styles.buttonStyle} onPress={() => this.setState({ showAnswer: true })}>
                      <Text>Show Answer</Text>
                    </Button>
                  ) : (
                      <Text style={styles.textStyles}>
                        Answer: {currentQuestion.answer}</Text>
                    )}
                  <Button success style={styles.buttonStyle} onPress={() => this.nextCard("correct")}>
                    <Text>Correct</Text>
                  </Button>
                  <Button danger style={styles.buttonStyle} onPress={() => this.nextCard("wrong")}>
                    <Text>Wrong</Text>
                  </Button>
                </Body>
              ) : (
                  <Body style={styles.container}>
                    <H3>Congratulations, the quiz has ended!</H3>

                    <Title>Correct answers</Title>
                    <Title>Wrong answers</Title>

                    <Button success style={styles.buttonStyle} onPress={() => this.restartQuiz()}>
                      <Text>Restart Quiz</Text>
                    </Button>
                    <Button info style={styles.buttonStyle} onPress={() => goBack()}>
                      <Text>Back to Deck</Text>
                    </Button>
                  </Body>
                )}
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
  cardStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 150,
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
  textStyles: {
    fontSize: 10,
    paddingTop: 10,
    paddingBottom: 10

  },
  textColor: {
    color: 'rgb(50, 49, 78)'
  }
});
