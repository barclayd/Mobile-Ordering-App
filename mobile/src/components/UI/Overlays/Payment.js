import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions, AsyncStorage} from 'react-native';
import {Card, Overlay} from 'react-native-elements';
import { CreditCardInput } from "react-native-credit-card-input";
import ButtonBackground from '../Buttons/ButtonWithBackground';
import RNPickerSelect from 'react-native-picker-select';
import * as colours from '../../../styles/colourScheme';
import Icon from "react-native-vector-icons/FontAwesome";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class MobilePayments extends Component {

    state = {
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
        const placeholder = {
            label: 'Select Collection Point',
            value: null,
            color: 'gray',
        };

        const collectionPoints = [];

        if (this.props.collectionPoints){
            this.props.collectionPoints.map(points => {
                collectionPoints.push({label: points.name, value: points.name, id: points.id})
            })
        }

        const userInfo = this.props.userId === null ? (<Icon name="warning" size={22} color={colours.warningRed}/>) : (<Icon name="check" size={30} color={colours.green}/>);

        return (
            <Overlay
                animationType="slide"
                height={(screenHeight / 3) * 2.65}
                width={screenWidth / 1.05}
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

                    <View style={styles.picker}>
                    <View>
                    <Text style={styles.collectionPoint}>COLLECTION POINT</Text>
                    </View>
                    <View style={styles.pad}>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={collectionPoints}
                        onValueChange={(value) => {
                            collectionPoints.map(cps => {
                                if (value === cps.label){
                                    this.setState({
                                        collectionPoint: {
                                            id: cps.id,
                                            valid: true,
                                            value: value
                                        }
                                    })
                                }
                            })
                        }}
                        style={{color: colours.pureWhite,
                        paddingRight: 30}}
                        value={this.state.collectionPoint.value}
                        // Icon={() => {
                        //     return <Icon name="chevron-down" size={20} color="gray" />;
                        // }}
                        />

                    </View>
                    </View>

                    <View style={{paddingVertical:5}}/>

                    <View style={{flexDirection: "row", alignContent: 'flex-start', paddingHorizontal: 20}}>        
                    <Text style={styles.collectionPoint}>User Infomation</Text>

                    {userInfo}

                    </View>

                    <Card
                        containerStyle={{backgroundColor: colours.midnightBlack, marginTop: 25}}>
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

                    <View style={[{height: screenHeight / 5.1}, styles.buttons]}>
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
                                disabled={!this.state.cvc.valid || !this.state.number.valid || !this.state.expiration.valid || !this.state.collectionPoint.valid || this.state.userId === null}
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
    }
});

export default MobilePayments
