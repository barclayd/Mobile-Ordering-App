import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, Slider} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as colours from '../../styles/colourScheme';
const screenHeight =Dimensions.get('window').height;
const screenWidth =Dimensions.get('window').width;


class Checkout extends Component {

    componentWillMount() {
        this.animation = new Animated.ValueXY({x:0, y: screenHeight - 180});
    }

    render() {
        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        };
        return (
            <Animated.View style={styles.animatedView}>
                <Animated.View
                    style={[animatedHeight, styles.bar]}>
                    <Animated.View
                        style={styles.basketBarContent}>
                        <View
                            style={styles.basketBarContentHolder}>
                            <Animated.View
                                style={styles.basketBarContentImgHolder}>
                                <Image style={styles.basketBarContentImg} source={require('../../assets/Logo.png')}/>
                            </Animated.View>
                            <Animated.Text style={styles.basketBarContentText}>
                                4 items
                            </Animated.Text>
                            <Animated.Text style={styles.basketBarContentText}>
                                Total price: £19.85
                            </Animated.Text>
                        </View>
                        <Animated.View style={styles.basketBarContentIcon}>
                                <Icon name="shopping-cart" size={30} color={colours.midnightBlack} />
                            </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    animatedView: {
        flex: 1,
        backgroundColor: colours.white
    },
    bar: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: colours.white,
        height: screenHeight
    },
    basketBarContent: {
        height: 100,
        borderTopWidth: 1,
        borderColor: colours.midGrey,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    basketBarContentHolder: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    basketBarContentImgHolder: {
        height: 32,
        width: 32,
        marginLeft: 15,
    },
    basketBarContentImg: {
        flex: 1,
        width: null,
        height: null
    },
    basketBarContentText: {
        opacity: 1,
        fontSize: 18,
        paddingLeft: 10
    },
    basketBarContentIcon: {
        opacity: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});


export default Checkout
