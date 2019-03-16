import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import * as colours from '../../styles/colourScheme';
import {Navigation} from "react-native-navigation";
import * as Progress from 'react-native-progress';


class OrderStatus extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

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

    render() {
        return (

            <View style={[styles.container]}>

                <View style={styles.header}>
                <Text style={styles.status}>Order Successful</Text>
                <Text style={styles.success}>Thank you for your Order!</Text>
                <Text style={styles.orderText}>Order Number: {this.props.orderNumber}</Text>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Status: Pending... </Text>
                <Progress.Circle size={30} indeterminate={true} color={colours.orange} thickness={15}/>
                </View>
                <Text style={styles.orderText}>Estimated Collection Time: 10:59pm </Text>
                </View>

                {/* <View style={styles.box}>
                <Text style={styles.status}>In Progress...</Text>
                </View>


                <View style={styles.orderInfo}>
                    <Text style={styles.text}> Order Number </Text>

                <TouchableOpacity>
                        <Text style={styles.text}> View QR Code </Text>
                    </TouchableOpacity>
                </View> */}
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
    }
});


export default OrderStatus;
