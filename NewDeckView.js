import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input } from 'native-base';

export default class NewDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
        <Body>
            <Title>Tell us the title of your new Deck</Title>
          </Body>
          <Form>
            <Item last>
              <Input placeholder="Deck Title" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
