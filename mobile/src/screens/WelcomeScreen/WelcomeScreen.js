import React, {Component} from 'react';
import {View, TextInput, Text, StyleSheet, Dimensions, ImageBackground,} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import barImage from '../../assets/barConfetti.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as colours from '../../styles/colourScheme';

class WelcomeScreen extends Component {

    render() {

        return (
             <ImageBackground style={styles.backgroundImg} source={barImage}>
                <LinearGradient colors={['transparent', '#F07719']} style={styles.linearGradient}>
                
                <View style={styles.overlayDark} />
                
                <View style={styles.rowContainer}>
                    <Text style={styles.welcome}>Drin</Text><Text style={styles.king}>King</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>Simplifiying your bar experience</Text>
                </View>
                
                <View style={styles.rowContainer}>
                    <TextInput placeholder='Enter a bar code...' style={styles.input} placeholderTextColor={'#E9E0D6'}/>
                    <View style={styles.btn}>
                    <Icon name="check" size={30} color="#E9E0D6"/>
                    </View>
                </View>
                {/* </View> */}
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 71,
        color: "#E9E0D6",
        top: 124
      },
      king: {
        fontSize: 71,
        color: "#F07719",
        top: 124
      },
        rowContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
      },
      h2:{
        color: '#989490',
        top: 140,
    },
    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
      },
    linearGradient: {
        // paddingTop: (Dimensions.get("window").height) / 2,
        // paddingBottom:  (Dimensions.get("window").height / 2) - 30,
        // borderRadius: 5,
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
    },    
    button: {
        fontSize: 36,
        fontFamily: 'Helvetica Neue',
        textAlign: 'center',
        alignSelf: 'flex-end',
        marginTop: 200
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    codeContainer: {
        flexDirection: 'row',
        //   justifyContent: 'center',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        // width: '100%',
        // height: '100%',
        // flexDirection: 'row'
    },
    logoContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
        height: '100%',
    },
    input: {
        width: (Dimensions.get("window").width) / 2,
        height: (Dimensions.get("window").height) / 11,
        borderWidth: 1,
        // borderRadius: 50,
        borderColor: '#E9E0D6',
        color: '#E9E0D6',
        fontSize: 16,
        top: 255,
        // margin: 10,
        // padding: 10,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btn: {
        width: (Dimensions.get("window").width) / 5,
        height: (Dimensions.get("window").height) / 11,
        borderWidth: 1,
        marginLeft: 10,
        borderColor: '#E9E0D6',
        color: '#E9E0D6',
        // textAlign: 'center',
        top: 255,
        alignItems: 'center',
        justifyContent: 'center'
        // top: 275
    },
    loginButton: {
        padding: 10,
        margin: 5,
        opacity: .7,
        borderRadius: 10
    }
});


export default WelcomeScreen;
