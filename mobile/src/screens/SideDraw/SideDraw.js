import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import * as colours from '../../styles/colourScheme';

class SideDrawer extends Component {
    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.8
            }]}>
                <Text style={styles.text}> Welcome to Side Drawer </Text>
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
    text: {
        color: colours.white,
        marginTop: (Dimensions.get("window").height / 2) - 20,
        marginLeft: (Dimensions.get("window").width / 5) - 20
    }
});

export default SideDrawer;
