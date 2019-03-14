import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as colours from '../../styles/colourScheme';
import {Navigation} from "react-native-navigation";

class OrderStatus extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
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
                <View style={styles.containerText}>
                    <Text style={styles.text}> Order Number </Text>
                     <Text style={styles.text}> Estimated Collection Time </Text>
                <TouchableOpacity>
                        <Text style={styles.text}> View QR Code </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
