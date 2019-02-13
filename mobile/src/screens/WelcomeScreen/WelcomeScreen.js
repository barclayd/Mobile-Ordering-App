import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import {View, TextInput, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import validate from '../../utility/validation';
import barImage from '../../assets/barConfetti.jpg';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colours from '../../styles/colourScheme';

class WelcomeScreen extends Component {

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
        if (this.state.controls.barCode.valid) {
            Promise.all([
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
                IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30)
            ])
                .then(sources => {
                    Navigation.setDefaultOptions({
                        sideMenu: {
                            left: {
                                enabled: true,
                                visible: true
                            },
                            right: {
                                visible: true,
                                enabled: true
                            }
                        },
                        statusBar: {
                            hideWithTopBar: false,
                        },
                        topBar: {
                            leftButtons: [
                                {
                                    id: 'menuButton',
                                    icon: sources[0],
                                    color: colours.white
                                }
                            ],
                            barStyle: 'black',
                            rightButtons: [
                                {
                                    id: 'profileButton',
                                    icon: sources[1],
                                    color: colours.white
                                }
                            ]
                        }
                    });
                    Navigation.setStackRoot(this.props.componentId, {
                        component: {
                            name: 'drinks-app.ViewDrinksScreen',
                            options: {
                                animations: {
                                    setStackRoot: {
                                        enabled: true
                                    }
                                },
                                topBar: {
                                    visible: true,
                                    title: {
                                        text: 'The Taff'
                                    }
                                }
                            }
                        }
                    })
                });
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

    render() {

        return (
             <ImageBackground style={styles.backgroundImg} source={barImage}>
                <LinearGradient colors={['transparent', colours.orange]} style={styles.linearGradient}>

                <View style={styles.overlayDark} />

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
                        style={[styles.input, {borderColor: this.state.controls.barCode.valid ? colours.green : colours.white}]}
                        placeholderTextColor={colours.white}
                        maxLength={4}
                        autoCorrect={false}
                        selectionColor={colours.orange}
                        onChangeText={(val) => this.inputUpdateHandler('barCode', val)}/>
                    <View style={[styles.btn, {borderColor: this.state.controls.barCode.valid ? colours.green : colours.white}]} >
                    <TouchableOpacity onPress={() => this.onSubmitCodeHandler()}>
                            <Icon name="check" size={30} color={this.state.controls.barCode.valid ? colours.green : colours.white}/>
                    </TouchableOpacity>
                    </View>
                </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 71,
        color: colours.white,
        top: 124
      },
      king: {
        fontSize: 71,
        color: colours.orange,
        top: 124
      },
        rowContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
      },
      h2:{
        color: colours.midGrey,
        top: 140,
    },
    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
      },
    linearGradient: {
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    overlayDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,.6)",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
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
        // borderColor: colours.cream,
        color: colours.cream,
        fontSize: 16,
        top: 255,
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
        top: 255,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginButton: {
        padding: 10,
        margin: 5,
        opacity: .7,
        borderRadius: 10
    }
});


export default WelcomeScreen;
