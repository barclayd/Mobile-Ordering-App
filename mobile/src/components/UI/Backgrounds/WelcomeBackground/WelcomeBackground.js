import React from 'react';
import {StyleSheet, ImageBackground, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import barImage from '../../../../assets/barConfetti.jpg';

const welcomeBackground = props => (
    <ImageBackground style={styles.backgroundImg} source={props.image ? props.image : barImage}>
        <LinearGradient colors={['transparent', props.colour1]} style={styles.linearGradient}>
            <View style={styles.overlayDark} />
            {props.children}
        </LinearGradient>
    </ImageBackground>
);

const styles = StyleSheet.create({
    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
    },
    linearGradient: {
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    },
    overlayDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,.6)",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    }
});

export default welcomeBackground;

