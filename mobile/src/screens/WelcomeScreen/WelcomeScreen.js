import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Dimensions, ImageBackground,} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import barImage from '../../assets/barConfetti.jpg';
import * as colours from '../../styles/colourScheme';

class WelcomeScreen extends Component {

    render() {

        return (
            <ImageBackground style={styles.backgroundImg} source={barImage}>
                <LinearGradient colors={['transparent', colours.orange]} style={styles.linearGradient}>
                    <View style={styles.mainContainer}>
                    <View style={styles.codeContainer}>
                            <TextInput placeholder='Enter a bar code' style={styles.input}/>
                    </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
      },
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
        borderColor: colours.white,
        color: colours.white,
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
