import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, Platform} from 'react-native';

const buttonWithBackground = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}]}>
            <Text style={[styles.buttonTextStyle, {color: props.textColor}]}>{props.children}</Text>
        </View>
    );

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        fontSize: 36,
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    }
});

export default buttonWithBackground;
