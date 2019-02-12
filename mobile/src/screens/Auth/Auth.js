import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

class AuthScreen extends Component {

    render() {

        return (
            <View>
                <LinearGradient colors={['#43C6AC', '#191654']} style={styles.linearGradient}>
                    <Button color='#fff' style={styles.buttonText} title='Login' onPress={this.loginHandler} />
                </LinearGradient>
            </View>
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
