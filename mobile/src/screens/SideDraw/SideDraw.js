import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as colours from '../../styles/colourScheme';
import {setDefaultSettings, setWelcomePageRoot} from "../../utility/navigation";
import * as actions from '../../store/actions/index';

class SideDrawer extends Component {

    logoutHandler = () => {
        this.props.onLogout();
        setDefaultSettings();
        setWelcomePageRoot();
    };

    render() {
        return (
            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.95
            }]}>
            <View style={[styles.drawItem, styles.header]}>
            <Text style={styles.text} >Account</Text>
            </View>
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
    header: {
        borderBottomWidth: 2,
        borderBottomColor: colours.cream,

    },
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
        marginTop: 20,
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
};

export default connect(null, mapDispatchToProps)(SideDrawer);
