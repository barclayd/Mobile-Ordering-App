import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Navigation } from "react-native-navigation";
import * as colours from '../../styles/colourScheme';

class SwitchBar extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
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
            <ScrollView style={styles.scroll}>
                <View style={[styles.container]}>
                    <Text style={styles.infoText}>SwitchBar</Text>
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
        paddingTop: 10,
        backgroundColor: colours.midnightBlack,
        color: colours.white,
        flex: 1
    },
    infoText: {
        fontSize: 12,
        color: colours.midGrey
    }
});


export default SwitchBar;
