import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as colours from '../../styles/colourScheme';
import {Navigation} from "react-native-navigation";
import * as Progress from 'react-native-progress';
import Modal from 'react-native-modal';
import ButtonBackground from '../../components/UI/Buttons/ButtonWithBackground';
import jwt from 'expo-jwt';


class OrderStatus extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        showQRCode: false
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps,"nextProps")
        // if (!nextProps.loading) {
        //   this.setState({
        //     pastOrders: nextProps.pastOrders
        //   });
        // }
      }

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

    toggleQRCode = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                showQRCode: !prevState.showQRCode
            }
        })
    };

    render() {
        let qrCode = null;
        const qrData = {
            userId: this.props.userId,
            collectionId: this.props.collectionId
        };
        const key = 'zvBT1lQV1RO9fx6f8';
        const token = jwt.encode({
            qrData
        }, key);
        if (this.props.userId && this.props.collectionId) {
            qrCode = <QRCode
                value={token}
                size={300}/>
        }

        return (

            <View style={[styles.container]}>

                <View style={styles.header}>
                <Text style={styles.status}>Order Successful</Text>
                <Text style={styles.success}>Thank you for your Order!</Text>
                <Text style={styles.orderText}>Order Number: {this.props.collectionId}</Text>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Status: Pending... </Text>
                <Progress.Circle size={30} indeterminate={true} color={colours.orange} thickness={15}/>
                </View>
                <Text style={styles.orderText}>Estimated Collection Time: 10:59pm </Text>
                </View>
                <View style={styles.button}>
                    <ButtonBackground
                        color={colours.orange}
                        onPress={() => this.toggleQRCode()}
                        textColor={colours.pureWhite}>
                        Show QR Code
                    </ButtonBackground>
                </View>
                    <Modal
                        visible={this.state.showQRCode}
                        onSwipeComplete={() => this.toggleQRCode()}
                        swipeDirection="down"
                        onBackdropPress={() => this.toggleQRCode()}>
                        <View style={styles.modal}>
                            <Text style={styles.header}>Order <Text style={{color: colours.orange}}>#{this.props.collectionId}</Text> </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40}}>
                                <Text style={styles.infoText}>Collection: <Text style={{color: colours.orange}}>{this.props.collectionPoint}</Text></Text>
                                <Text style={styles.infoText}>Order Time: <Text style={{color: colours.orange}}>{new Date(this.props.date).toTimeString().slice(0,5)}</Text></Text>
                            </View>
                                <View style={styles.qrCode}>
                                    {qrCode}
                                </View>
                        </View>
                    </Modal>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    progressCircle:{
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    },
    box:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderColor: colours.cream,
        borderWidth: 2
    },
    orderInfo:{
    paddingTop: 10,
    paddingRight: 10,
    },
    status:{
      fontSize: 24,
      fontWeight: '600',
      color: colours.cream,
      padding: 10,
    },
    success:{
        fontSize: 20,
        fontWeight: '500',
        padding: 10,
        color: colours.orange,
        marginBottom: 25,
      },
    orderText:{
        fontSize: 16,
        fontWeight: '400',
        color: colours.cream,
        padding: 10,
      },
    container: {
        paddingTop: 22,
        backgroundColor: colours.midnightBlack,
        color: colours.white,
        flex: 1
    },
    containerText: {
        height: (Dimensions.get("window").height / 6),
    },
    text: {
        color: colours.white,
    },
    qrCode: {
        backgroundColor: colours.pureWhite,
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        width: Dimensions.get('window').width/2
    },
    header: {
        color: colours.midnightBlack,
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
        justifyContent: 'center'
    },
    modal: {
        backgroundColor: colours.pureWhite,
        padding: 40,
    },
    infoText: {
        fontSize: 12,
        color: colours.midGrey
    }
});


export default OrderStatus;
