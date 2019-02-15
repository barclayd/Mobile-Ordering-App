import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
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
        });
        console.log(this.state);
    };

    render() {
        let authText =  this.state.authMode === 'login' ? 'Login' : 'Sign Up';
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: authText
                }
            },
        });

        let confirmPasswordControl = null;
        if (this.state.authMode === 'signup') {
           confirmPasswordControl = (
               <TextInput
                   style={[styles.input, !this.state.controls.confirmPassword.valid && this.state.controls.confirmPassword.touched ? styles.invalidPasswordLength : null]}
                   placeholder='Confirm Password'
                   placeholderTextColor={colours.white}
                   autoComplete='password'
                   autoCorrect={false}
                   secureTextEntry={true}
                   selectionColor={colours.orange}
                   textContentType='password'
                   autoCapitalize='none'
                   onChangeText={(val) => this.updateInputHandler('confirmPassword', val)}
               />
           )
        }

        return (
            <DismissKeyboard>
            <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
            <WelcomeBackground colour1={colours.midBlue} image={img}>
                <View styles={styles.container}>
                    <TextInput
                        style={[styles.input, !this.state.controls.email.valid && this.state.controls.email.touched ? styles.invalid : null]}
                        placeholder='Email'
                        placeholderTextColor={colours.white}
                        autoComplete='email'
                        autoCorrect={false}
                        keyboardType='email-address'
                        selectionColor={colours.orange}
                        textContentType='emailAddress'
                        autoCapitalize='none'
                        value={this.state.controls.email.value}
                        onChangeText={(val) => this.updateInputHandler('email', val)}/>
                    <TextInput
                        style={[styles.input, !this.state.controls.password.valid && this.state.controls.password.touched ? styles.invalidPasswordLength : null]}
                        placeholder='Password'
                        placeholderTextColor={colours.white}
                        autoComplete='password'
                        autoCorrect={false}
                        secureTextEntry={true}
                        selectionColor={colours.orange}
                        textContentType='password'
                        autoCapitalize='none'
                        onChangeText={(val) => this.updateInputHandler('password', val)}/>
                    {confirmPasswordControl}
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.helperText}>Forgot your <Text style={{color: colours.orange}}>password</Text>?</Text>
                        <View>
                            <Text style={styles.helperText}>
                                <Text style={{color: colours.orange}} onPress={this.switchAuthModeHandler}>
                                    {this.state.authMode === 'login' ? 'Create ' : 'Sign in to '}</Text>an account.
                            </Text>
                        </View>
                </View>
                <View style={styles.loginBtn}>
                    <ButtonWithBackground
                        color={colours.lightBlue}
                        disabled={!this.state.controls.password.valid || !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || !this.state.controls.email.valid}
                        textColor={colours.cream}>
                        {this.state.authMode === 'login' ? 'Login' : 'Sign Up'}
                    </ButtonWithBackground>
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
    },
    invalid: {
        borderColor: colours.warningRed,
        color: colours.warningRed
    },
    invalidPasswordLength: {
        borderColor: colours.warningRed,
    }
});

export default AuthScreen;
