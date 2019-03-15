import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {Card, Overlay} from 'react-native-elements';
import { CreditCardInput } from "react-native-credit-card-input";
import ButtonBackground from '../Buttons/ButtonWithBackground';
import * as colours from '../../../styles/colourScheme';

const screenHeight = Dimensions.get('window').height;

class MobilePayments extends Component {

    state = {
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
        }
    };

    onInputChange = (formData) => {
        this.setState({
            number: {
                valid: formData.status.number === 'valid',
                value: formData.values.number
            },
            expiration: {
                valid: formData.status.expiry === 'valid',
                value: formData.values.expiry
            },
            cvc: {
                valid: formData.status.cvc === 'valid',
                value: formData.values.cvc
            }
        })
    };

    render() {
        return (
            <Overlay
                animationType="slide"
                height={(screenHeight / 3) * 2}
                overlayBackgroundColor={colours.midnightBlack}
                overlayStyle={styles.overlayBorder}
                onBackdropPress={this.props.hidePayment}
                isVisible={this.props.visible}>
                <View style={[{height: screenHeight / 2.5}]}>
                    <Text style={styles.header}>
                        Checkout
                    </Text>
                    <CreditCardInput
                        cardScale={0.7}
                        onChange={this.onInputChange}
                        labelStyle={{color: colours.pureWhite}}
                        inputStyle={{color: colours.orange}}
                        allowScroll/>
                    <Card
                        containerStyle={{backgroundColor: colours.midnightBlack}}>
                        <View style={styles.summary}>
                            <Text style={styles.barOrderDetails1}>
                                Items: {this.props.basketItems}
                            </Text>
                            <Text style={{color: colours.midGrey, fontSize: 30}}>
                                |
                            </Text>
                            <Text style={styles.barOrderDetails2}>
                                Price: £{this.props.basketPrice}
                            </Text>
                        </View>
                    </Card>
                    <View style={[{height: screenHeight / 3}, styles.buttons]}>
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
                                disabled={!this.state.cvc.valid || !this.state.number.valid || !this.state.expiration.valid}
                                textColor={colours.orange}
                                onPress={() => this.props.submitOrder(this.state)}>
                                Pay
                            </ButtonBackground>
                        </View>
                    </View>
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlayBorder: {
        borderColor: colours.darkGrey,
        borderWidth: 3
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
    }
});

export default MobilePayments;
