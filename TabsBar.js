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

    render() {
        return (
            <Footer>
                <FooterTab>
                    <Button>
                        <Icon type="MaterialCommunityIcons" size={200} name="view-module" />
                        <Text>View Decks</Text>
                    </Button>
                    <Button>
                        <Icon type="MaterialIcons" name="add-box" size={200} />
                        <Text>Add Decks</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}