import React, {Component} from 'react';
import {View, Text} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';
import * as colours from "../../styles/colourScheme";

class AuthScreen extends Component {

    render() {

        return (
            <WelcomeBackground colour1={colours.midBlue}>
                <View>
                    <Text>{this.props.authState}</Text>
                </View>
            </WelcomeBackground>
        );
    }
}

export default AuthScreen;
