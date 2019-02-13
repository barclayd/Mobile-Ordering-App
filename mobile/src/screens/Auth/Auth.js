import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';

class AuthScreen extends Component {

    render() {

        return (
            <WelcomeBackground>
                <View>
                    <Text>{this.props.authState}</Text>
                </View>
            </WelcomeBackground>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingTop: (Dimensions.get("window").height / 2),
        paddingBottom:  (Dimensions.get("window").height / 2) - 30,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 36,
        fontFamily: 'Helvetica Neue',
        textAlign: 'center'
    }
});

export default AuthScreen;
