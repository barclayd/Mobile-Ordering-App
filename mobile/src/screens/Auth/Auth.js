import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';
import * as colours from "../../styles/colourScheme";
import ButtonWithBackground from "../../components/UI/Buttons/ButtonWithBackground";
import img from '../../assets/nightclub.jpg';
import {DismissKeyboard} from '../../components/Utilities/DismissKeyboard';
import validate from "../../utility/validation";

class AuthScreen extends Component {

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }

    updateStyles = () => {
        this.setState({
            viewMode: Dimensions.get("window").height > 800 ? 'portrait' : 'landscape'
        });
    };

    state = {
        viewMode: Dimensions.get("window").height > 800 ? 'portrait' : 'landscape',
        authMode: this.props.authState,
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password:  {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            }
        })
    };

    updateInputHandler = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    }
                }
            }
        })
    };

    render() {

        let confirmPasswordControl = null;
        if (this.state.authMode === 'signup') {
           confirmPasswordControl = (
               <TextInput
                   style={styles.input}
                   placeholder='Confirm Password'
                   placeholderTextColor={colours.white}
                   autoComplete='password'
                   autoCorrect={false}
                   secureTextEntry={true}
                   selectionColor={colours.orange}
                   textContentType='password'
                   autoCapitalize='none'
               />
           )
        }

        return (
            <DismissKeyboard>
            <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
            <WelcomeBackground colour1={colours.midBlue} image={img}>
                <View styles={styles.container}>
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
                    {confirmPasswordControl}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.helperText}>Forgot your <Text style={{color: colours.orange}}>password</Text>?</Text>
                    <Text style={styles.helperText}><Text style={{color: colours.orange}}>Create</Text> an account.</Text>
                </View>
                <View style={styles.loginBtn}>
                    <ButtonWithBackground color={colours.lightBlue} textColor={colours.cream}>Login</ButtonWithBackground>
                </View>
            </WelcomeBackground>
            </KeyboardAvoidingView>
            </DismissKeyboard>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flex: 1,
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
