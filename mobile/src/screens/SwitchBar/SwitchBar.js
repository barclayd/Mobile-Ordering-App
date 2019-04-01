import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colours from '../../styles/colourScheme';
import validate from "../../utility/validation";
import MapDisplay from '../../components/MapDisplay/MapDisplay';
import * as actions from "../../store/actions";

let submittedCode;

class SwitchBar extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
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

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "menuButton") {
            !this.isSideDrawerVisible
                ? (this.isSideDrawerVisible = true)
                : (this.isSideDrawerVisible = false);
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.isSideDrawerVisible
                    }
                }
            });
        }
        if (buttonId === "profileButton") {
            !this.isSideDrawerVisible
                ? (this.isSideDrawerVisible = true)
                : (this.isSideDrawerVisible = false);
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    right: {
                        visible: this.isSideDrawerVisible
                    }
                }
            });
        }
    }

    onSubmitCodeHandler = () => {
        if(this.state.controls.barCode.valid) {
            this.props.findBar(this.state.controls.barCode.value, this.props.componentId, null, true);
            submittedCode = this.state.controls.barCode.value;
        }
    };

    render() {

        const drinKingText =
            <View style={{top: (Dimensions.get("window").height) / 11}}>
            <Text style={styles.header}>Browse the map for nearby Drin<Text style={{color: colours.orange}}>Kings</Text></Text>
            </View>;

        return (
            <ScrollView style={styles.scroll}>
                <View style={[styles.container]}>
                    <View style={styles.halfScreen}>
                        <View style={styles.columnContainer}>
                            <View>
                                <Text style={styles.header}>Find other Drin<Text style={{color: colours.orange}}>King</Text> establishments</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <TextInput
                                    placeholder='Enter a bar code...'
                                    value={this.state.controls.barCode.value}
                                    style={[styles.input, {borderColor: this.props.barError && submittedCode === this.state.controls.barCode.value  ? colours.warningRed : this.state.controls.barCode.valid ? colours.green : colours.white}]}
                                    placeholderTextColor={colours.white}
                                    maxLength={4}
                                    autoCorrect={false}
                                    selectionColor={colours.orange}
                                    onChangeText={(val) => this.inputUpdateHandler('barCode', val)}/>
                                <View style={[styles.btn, {borderColor: this.props.barError && submittedCode === this.state.controls.barCode.value  ? colours.warningRed : this.state.controls.barCode.valid ? colours.green : colours.white}]} >
                                    <TouchableOpacity onPress={() => this.onSubmitCodeHandler()}>
                                        {this.props.barError && submittedCode === this.state.controls.barCode.value  ? <Icon name="warning" size={30} color={colours.warningRed}/> : this.props.barLoading ?
                                            <Icon name="spinner" size={30} color={colours.grey}/> :
                                            <Icon name="check" size={30} color={this.state.controls.barCode.valid ? colours.green : colours.white} />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.rowContainer}>
                                {this.props.barError && submittedCode === this.state.controls.barCode.value ? <Text style={styles.h3}>Bar code <Text style={{color: colours.warningRed}}>{submittedCode}</Text> could not be found. Please try again</Text> : drinKingText}
                            </View>
                        </View>
                    </View>
                    <View style={styles.mapView}>
                        <MapDisplay componentId={this.props.componentId} redirect={true}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        backgroundColor: colours.midnightBlack
    },
    container: {
        backgroundColor: colours.midnightBlack,
        color: colours.white,
        flex: 1
    },
    infoText: {
        fontSize: 12,
        color: colours.midGrey
    },
    halfScreen: {
        height: Dimensions.get('window').height / 4
    },
    welcome: {
        fontSize: 71,
        color: colours.white,
        top: Dimensions.get('window').height / 6
    },
    inputContainer: {
        flex: 1,
    },
    columnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    h3:{
        color: colours.midGrey,
        top: (Dimensions.get("window").height) / 11
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
        top: (Dimensions.get('window').height / 30),
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
        top: (Dimensions.get('window').height / 30),
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        color: colours.lightGrey,
        marginTop: 10
    },
    mapView: {
        marginTop: (Dimensions.get("window").height) / 25
    }
});

const mapStateToProps = state => {
    return {
        barLoading: state.bar.loading,
        barError: state.bar.error,
        userId: state.auth.userId,
        name: state.auth.name
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: (componentId) => dispatch(actions.authCheckState(componentId)),
        findBar: (barCode, componentId, autoLogin, redirect) => dispatch(actions.findBar(barCode, componentId, autoLogin, redirect))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SwitchBar);
