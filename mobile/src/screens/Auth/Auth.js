import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import {connect} from 'react-redux';
import {View, Text, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';
import * as colours from "../../styles/colourScheme";
import ButtonWithBackground from "../../components/UI/Buttons/ButtonWithBackground";
import img from '../../assets/nightclub.jpg';
import {DismissKeyboard} from '../../components/Utilities/DismissKeyboard';
import validate from "../../utility/validation";   
import * as actions from '../../store/actions/index';
import {closeLoginModal} from '../../utility/navigation';

class AuthScreen extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
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
                    minLength: 4
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
            },
            firstName: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2
                },
                touched: false
            },
            surname: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2
                },
                touched: false
            }
        }
    };

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "close") {
            closeLoginModal(this.props.componentId)
        }
    }

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
    };

    loginHandler = async () => {
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        const name = this.state.controls.firstName.value + ' ' + this.state.controls.surname.value;
        const authMode = this.state.authMode === 'signup';
        await this.props.onAuth(email, password, name, this.props.componentId, authMode, this.props.modal);
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
        let firstNameControl = null;
        let surnameControl = null;
        if (this.state.authMode === 'signup') {
            firstNameControl = (
             <TextInput
                 style={[styles.inputName, !this.state.controls.firstName.valid && this.state.controls.firstName.touched ? styles.invalid : null]}
                 placeholder='First Name'
                 placeholderTextColor={colours.white}
                 autoComplete='name'
                 selectionColor={colours.orange}
                 textContentType='givenName'
                 autoCapitalize='words'
                 value={this.state.controls.firstName.value}
                 onChangeText={(val) => this.updateInputHandler('firstName', val)}
             />
         );
            surnameControl = (
                <TextInput
                    style={[styles.inputName, !this.state.controls.surname.valid && this.state.controls.surname.touched ? styles.invalid : null]}
                    placeholder='Surname'
                    placeholderTextColor={colours.white}
                    autoComplete='name'
                    selectionColor={colours.orange}
                    textContentType='familyName'
                    autoCapitalize='words'
                    value={this.state.controls.surname.value}
                    onChangeText={(val) => this.updateInputHandler('surname', val)}
                />
            );
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
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={(val) => this.updateInputHandler('confirmPassword', val)}
                />
            );
        }

        return (
            <DismissKeyboard>
            <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
            <WelcomeBackground colour1={colours.midBlue} image={img}>
                <View styles={styles.container}>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    {firstNameControl}
                    {surnameControl}
                    </View>
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
                        value={this.state.controls.password.value}
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
                <View style={this.state.authMode === 'login' ? styles.loginBtn : styles.signUpButton}>
                    <ButtonWithBackground
                        color={colours.lightBlue}
                        disabled={!this.state.controls.password.valid || !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup' || !this.state.controls.email.valid}
                        textColor={colours.cream}
                        onPress={this.loginHandler}>
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
    rowContainer: {
      flexDirection: 'row',
        flex: 1
    },
    loginBtn: {
        top: (Dimensions.get('window').height / 6),
        width: '50%',
        alignSelf: 'center'
    },
    signUpButton: {
        top: (Dimensions.get('window').height / 6) / 1.5,
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
    },
    inputName: {
        width: '40%',
        height: '130%',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0,
        padding: 10,
        borderWidth: 2,
        borderColor: colours.cream,
        borderRadius: 25,
        color: colours.cream,
        fontSize: 16,
        fontStyle: 'italic',
        top: (Dimensions.get('window').height / 8),
        alignSelf: 'center',
        textAlign: 'center'
    },
});

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, name, componentId, isSignUp, modal) => dispatch(actions.auth(email, password, name, componentId, isSignUp, modal))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
