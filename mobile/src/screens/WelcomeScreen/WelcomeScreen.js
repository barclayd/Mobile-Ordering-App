import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navigation} from "react-native-navigation";
import {View, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import WelcomeBackground from '../../components/UI/Backgrounds/WelcomeBackground/WelcomeBackground';
import ButtonWithBackground from '../../components/UI/Buttons/ButtonWithBackground';
import validate from '../../utility/validation';
import {setLoginSettings, setLoginScreen} from '../../utility/navigation';
import {DismissKeyboard} from '../../components/Utilities/DismissKeyboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colours from '../../styles/colourScheme';
import * as actions from '../../store/actions/index';

let submittedCode;

class WelcomeScreen extends Component {

    componentDidMount() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                visible: false
            }
        });
        this.props.onTryAutoSignIn();
    }

    state = {
        controls: {
            barCode: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 4
                }
            }
        }
    };

    onSubmitCodeHandler = () => {
        if(this.state.controls.barCode.valid) {
            console.log('valid was called');
            this.props.findBar(this.state.controls.barCode.value, this.props.componentId);
            submittedCode = this.state.controls.barCode.value;
        }
    };

    inputUpdateHandler = (key, value) => {

        this.setState(prevState => {
           return {
               controls: {
                   ...prevState.controls,
                   [key]: {
                       ...prevState.controls[key],
                       value: value,
                       valid: validate(value, prevState.controls[key].validationRules)
                   }
               }
           }
        });

    };

    onLoginButtonHandler = (authType) => {
        setLoginSettings();
        setLoginScreen(this.props.componentId, authType);
    };

    render() {

        return (
            <DismissKeyboard>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={styles.inputContainer}>
            <WelcomeBackground colour1={colours.orange} >
                <View style={styles.rowContainer}>
                    <Text style={styles.welcome}>Drink</Text><Text style={styles.king}>King</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>Simplifying your bar experience</Text>
                </View>

                <View style={styles.rowContainer}>
                    <TextInput
                        placeholder='Enter a bar code...'
                        value={this.state.controls.barCode.value}
                        style={[styles.input, {borderColor: this.props.barError ? colours.warningRed : this.state.controls.barCode.valid ? colours.green : colours.white}]}
                        placeholderTextColor={colours.white}
                        maxLength={4}
                        autoCorrect={false}
                        selectionColor={colours.orange}
                        onChangeText={(val) => this.inputUpdateHandler('barCode', val)}/>
                    <View style={[styles.btn, {borderColor: this.props.barError ? colours.warningRed : this.state.controls.barCode.valid ? colours.green : colours.white}]} >
                    <TouchableOpacity onPress={() => this.onSubmitCodeHandler()}>
                        {this.props.barError ? <Icon name="warning" size={30} color={colours.warningRed}/> : this.props.barLoading ?
                            <Icon name="spinner" size={30} color={colours.grey}/> :
                            <Icon name="check" size={30} color={this.state.controls.barCode.valid ? colours.green : colours.white} />
                        }
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowContainer}>
                    {this.props.barError ? <Text style={styles.h3}>Bar code <Text style={{color: colours.warningRed}}>{submittedCode}</Text> could not be found. Please try again</Text> : null}
                </View>
                <View style={styles.loginButtonContainer}>
                        <ButtonWithBackground color={colours.lightBlue} textColor={colours.cream}  onPress={() => this.onLoginButtonHandler('login')}>Login</ButtonWithBackground>
                        <ButtonWithBackground color={colours.darkOrange} textColor={colours.cream} onPress={() => this.onLoginButtonHandler('signup')}>Sign Up</ButtonWithBackground>
                </View>
            </WelcomeBackground>
                </KeyboardAvoidingView>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 71,
        color: colours.white,
        top: Dimensions.get('window').height / 6
      },
      king: {
        fontSize: 71,
        color: colours.orange,
        top: Dimensions.get('window').height / 6
      },
    inputContainer: {
        flex: 1,
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      },
      h2:{
        color: colours.cream,
        top: (Dimensions.get('window').height / 5)
    },
    h3:{
        color: colours.midGrey,
        top: ((Dimensions.get('window').height / 5.5) * 2)
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
    },
    input: {
        width: (Dimensions.get("window").width) / 2,
        height: (Dimensions.get("window").height) / 11,
        borderWidth: 1,
        color: colours.cream,
        fontSize: 16,
        top: (Dimensions.get('window').height / 6) * 2,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        width: (Dimensions.get("window").width) / 5,
        height: (Dimensions.get("window").height) / 11,
        borderWidth: 1,
        marginLeft: 10,
        borderColor: colours.cream,
        color: colours.cream,
        top: (Dimensions.get('window').height / 6) * 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButtonContainer: {
        top: ((Dimensions.get('window').height / 6) * 3),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});

const mapStateToProps = state => {
    return {
        barLoading: state.bar.loading,
        barError: state.bar.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState()),
        findBar: (barCode, componentId) => dispatch(actions.findBar(barCode, componentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
