import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colours from '../../styles/colourScheme';
import {setDefaultSettings, setWelcomePageRoot} from "../../utility/navigation";

class SideDrawer extends Component {

    logoutHandler = () => {
        setDefaultSettings();
        setWelcomePageRoot();
    };

    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.95
            }]}>
                <TouchableOpacity onPress={() => this.logoutHandler()}>
                    <View style={styles.drawItem}>
                        <Icon size={30} color='#fff' name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} style={styles.drawItemIcon} />
                        <Text style={styles.text}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        backgroundColor: colours.midnightBlack,
        color: colours.cream,
        flex: 1
    },
    drawItem: {
        color: "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
        marginTop: 20
    },
    text: {
        color: colours.cream,
        fontSize: 24,
        width: '80%',
    },
    drawItemIcon: {
        marginRight: 30
    }

});

export default SideDrawer;
