import React from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import {Card, Overlay} from 'react-native-elements';
import { CreditCardInput } from "react-native-credit-card-input";
import ButtonBackground from '../Buttons/ButtonWithBackground';
import * as colours from '../../../styles/colourScheme';

const screenHeight = Dimensions.get('window').height;

const mobilePayments = props => {

    const onInputChange = (formData) => console.log(JSON.stringify(formData, null, " "));

    return (
        <Overlay
            animationType="slide"
            overlayBackgroundColor={colours.midnightBlack}
            overlayStyle={styles.overlayBorder}
            onBackdropPress={props.hidePayment}
            isVisible={props.visible}>
            <CreditCardInput
                cardScale={0.7}
                onChange={onInputChange}
                labelStyle={{color: colours.pureWhite}}
                inputStyle={{color: colours.orange}}
                allowScroll/>
            <View style={[{height: screenHeight/5}]}>
            <Card
                containerStyle={{backgroundColor: colours.midnightBlack}}>
                <View style={styles.summary}>
                    <Text style={styles.barOrderDetails1}>
                        Items: {props.basketItems}
                    </Text>
                    <Text style={{ color: colours.midGrey, fontSize: 30}}>
                        |
                    </Text>
                    <Text style={styles.barOrderDetails2}>
                        Price: £{props.basketPrice}
                    </Text>
                </View>
            </Card>
            </View>
            <View style={[{height: screenHeight/4}, styles.buttons]}>
                <View style={styles.buttonStyle}>
                    <ButtonBackground
                        color={colours.warningRed}
                        textColor={colours.white}>
                        Cancel
                    </ButtonBackground>
                </View>
                <View style={styles.buttonStyle}>
                    <ButtonBackground
                        color={colours.orange}
                        textColor={colours.white}>
                        Pay
                    </ButtonBackground>
                </View>
            </View>
        </Overlay>
    )
};

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
    }
});

export default mobilePayments;
