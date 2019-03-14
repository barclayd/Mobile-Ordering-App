import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as colours from '../../styles/colourScheme';

class Settings extends Component {
    render() {
        return (

            <View style={[styles.container, {
                width: Dimensions.get("window").width * 0.8
            }]}>
                <TouchableOpacity onPress={() => this.props.loadPreviousOrders()}>
                <Text style={styles.text}> Welcome to Settings </Text>
                </TouchableOpacity>
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

const mapDispatchToProps = dispatch => {
  return {
      loadPreviousOrders: () => dispatch(actions.orderHistory())
  }
};

export default connect(null, mapDispatchToProps)(Settings);
