import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, StyleSheet, Text, View, Platform} from 'react-native';

const buttonWithBackground = props => {

    const content = (
        <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabledButtonBackground : null ]}>
            <Text style={[styles.buttonTextStyle, {color: props.textColor}, props.disabled ? styles.disabledButtonText : null,  ]}>{props.children}</Text>
        </View>
    );
    if (props.disabled) {
        return content;
    }
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
        borderRadius: 10,
        fontSize: 36,
        margin: 10
    },
    buttonTextStyle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    disabledButtonBackground: {
        opacity: .6,
    },
    disabledButtonText: {
        color: '#aaa',
    }
});

export default buttonWithBackground;
