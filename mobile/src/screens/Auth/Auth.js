import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';
import * as colours from "../../styles/colourScheme";
import ButtonWithBackground from "../../components/UI/Buttons/ButtonWithBackground";
import img from '../../assets/nightclub.jpg';

class AuthScreen extends Component {

    render() {

        return (
            <WelcomeBackground colour1={colours.midBlue} image={img}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor={colours.white}
                        autoComplete='email'
                        autoCorrect={false}
                        keyboardType='email-address'
                        selectionColor={colours.orange}
                        textContentType='emailAddress'
                        autoCapitalize='none'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        placeholderTextColor={colours.white}
                        autoComplete='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        selectionColor={colours.orange}
                        textContentType='password'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.helperText}>Forgot your <Text style={{color: colours.orange}}>password</Text>?</Text>
                    <Text style={styles.helperText}><Text style={{color: colours.orange}}>Create</Text> an account.</Text>
                </View>
                <View style={styles.loginBtn}>
                    <ButtonWithBackground color={colours.lightBlue} textColor={colours.cream}>Login</ButtonWithBackground>
                </View>
            </WelcomeBackground>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: '15%',
        margin: 15,
        borderWidth: 2,
        borderColor: colours.cream,
        borderRadius: 25,
        color: colours.cream,
        fontSize: 16,
        fontStyle: 'italic',
        top: (Dimensions.get('window').height / 6),
        alignSelf: 'center',
        textAlign: 'center'
    },
    loginBtn: {
        top: (Dimensions.get('window').height / 6),
        width: '50%',
        alignSelf: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    helperText: {
        color: colours.cream,
        top: (Dimensions.get('window').height / 14),
        margin: 5
    }
});

export default AuthScreen;
