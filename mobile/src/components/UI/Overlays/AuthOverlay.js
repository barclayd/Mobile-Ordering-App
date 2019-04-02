import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions, TextInput, KeyboardAvoidingView} from 'react-native';
import {Overlay} from 'react-native-elements';
import ButtonBackground from '../Buttons/ButtonWithBackground';
import * as colours from '../../../styles/colourScheme';
import {DismissKeyboard} from '../../../components/Utilities/DismissKeyboard';
import validate from '../../../utility/validation';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class AuthOverlay extends Component {

    state = {
        text: null,
        userId: null,
      number: {
          valid: false,
          value: null
      },
        expiration: {
            valid: false,
            value: null
        }, cvc: {
            valid: false,
            value: null
        },
        collectionPoint: {
            valid: false,
            value: null,
            id: null
        },
        controls: {
            email: {
                value: null,
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

    updateInputHandler = (key, value) => {
        this.setState(prevState => {
            return {
                ...prevState.controls,
                [key]: {
                    ...prevState.controls[key],
                    value: value,
                    valid: validate(value, prevState.controls[key]),
                    touched: true
                },}
            });
    };

    render() {

        return (
            <DismissKeyboard>
            <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
            <Overlay
                animationType="slide"
                height={(screenHeight / 3) * 2.65}
                width={screenWidth / 1.05}
                overlayBackgroundColor={colours.midnightBlack}
                overlayStyle={styles.overlayBorder}
                onBackdropPress={this.props.hideAuth}
                isVisible={this.props.visible}>
                <View style={[{height: screenHeight / 2.5}]}>
                    <Text style={styles.header}>
                        Login
                    </Text>

                    <View style={styles.container}>

                    <TextInput
                        style={[styles.input]}
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

                    </View>

                    <View style={[{height: screenHeight / 4}, styles.buttons]}>
                        <View style={styles.buttonStyle}>
                            <ButtonBackground
                                color={colours.warningRed}
                                onPress={this.props.onCancel}
                                textColor={colours.white}>
                                Cancel
                            </ButtonBackground>
                        </View>
                        <View style={styles.buttonStyle}>
                            <ButtonBackground
                                color={colours.white}
                                disabled={!this.state.cvc.valid || !this.state.number.valid || !this.state.expiration.valid || !this.state.collectionPoint.valid || this.state.userId !== null}
                                textColor={colours.orange}
                                onPress={() => this.props.submitOrder(this.state)}>
                                Login
                            </ButtonBackground>
                        </View>
                    </View>

                </View>
            </Overlay>
            </KeyboardAvoidingView>
            </DismissKeyboard>
        )
    }
}

const styles = StyleSheet.create({
    overlayBorder: {
        borderColor: colours.darkGrey,
        borderWidth: 3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonStyle: {
        marginRight: 18
    },
    barOrderDetails1: {
        fontWeight: 'bold',
        color: colours.midGrey
    },
    barOrderDetails2: {
        fontWeight: 'bold',
        color: colours.orange
    },
    header: {
        fontWeight: 'bold',
        color: colours.white,
        fontSize: 24,
        textAlign: 'center'
    },
    picker: {
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    collectionPoint:{
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    },
    pad: {
        marginTop: 5
    },
    input: {
        width: '80%',
        height: screenHeight / 12,
        margin: 15,
        borderWidth: 1,
        borderColor: colours.cream,
        borderRadius: 25,
        color: colours.cream,
        fontSize: 16,
        fontStyle: 'italic',
        top: screenHeight / 12,
        alignSelf: 'center',
        textAlign: 'center'
    },
    inputContainer: {
        flex: 1,
    },

});

export default AuthOverlay
