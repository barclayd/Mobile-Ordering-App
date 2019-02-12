import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

class WelcomeScreen extends Component {

    render() {

        return (
                <LinearGradient colors={['#43C6AC', '#191654']} style={styles.linearGradient}>
                    <View style={styles.mainContainer}>
                    <View style={styles.codeContainer}>
                            <TextInput placeholder='Enter a barcode' style={styles.input}/>
                    </View>
                    </View>
                </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingTop: (Dimensions.get("window").height) / 2,
        paddingBottom:  (Dimensions.get("window").height / 2) - 30,
        borderRadius: 5,
        flex: 1,
    },
    button: {
        fontSize: 36,
        fontFamily: 'Helvetica Neue',
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginTop: 200
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    codeContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    },
    logoContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
    },
    input: {
        width: (Dimensions.get("window").width) / 2,
        height: (Dimensions.get("window").height) / 8,
        borderWidth: 3,
        borderRadius: 50,
        borderColor: '#bebebe',
        color: '#fff',
        fontSize: 30,
        margin: 10,
        padding: 10,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    loginButton: {
        padding: 10,
        margin: 5,
        opacity: .7,
        borderRadius: 10
    }
});


export default WelcomeScreen;