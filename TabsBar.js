import React, { Component } from 'react';
import { View } from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Icon, Button, Text } from 'native-base';

export default class TabsBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
        };
    }

    navigateToAddDeck = () => {
        const { navigate } = this.props.navigation;

        console.log(navigate, "SDSADASD");
        return this.props.navigation.navigate('NewDeckView');
    }

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button onPress={this.navigateToDecks}>
                        <Icon type="MaterialCommunityIcons" size={200} name="view-module" />
                        <Text>Decks</Text>
                    </Button>
                    <Button onPress={this.navigateToAddDeck}>
                        <Icon type="MaterialIcons" name="add-box" size={200} />
                        <Text>Add Deck</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}