import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, Slider} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as colours from '../../styles/colourScheme';
import {connect} from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Checkout extends Component {

    componentWillMount() {
        this.animation = new Animated.ValueXY({x:0, y: screenHeight - 90});
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gestureState) => {
                this.animation.extractOffset();
            },
            onPanResponderMove: (event, gestureState) => {
                this.animation.setValue({x: 0, y: gestureState.dy})
            },
            onPanResponderRelease: (event, gestureState) => {
                if(gestureState.dy < 0) {
                    Animated.spring(this.animation.y, {
                        toValue: -screenHeight + 90,
                        tension: 1
                    }).start();
                } else if (gestureState.dy > 0) {
                    Animated.spring(this.animation.y, {
                        toValue: screenHeight - 90,
                        tension: 1
                    }).start();
                }
            }
        })
    }

    render() {
        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        };

        const animatedImageHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [200, 32],
            extrapolate: 'clamp'
        });

        const animatedTextOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-500, screenHeight-90],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        const animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [screenWidth/2 - 100, 10],
            extrapolate: 'clamp'
        });

        const animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-100],
            outputRange: [screenHeight/2, 100],
            extrapolate: 'clamp'
        });


        return (
            <Animated.View style={styles.animatedView}>
                <Animated.View
                    style={[animatedHeight, styles.bar]}>
                    <Animated.View
                        {...this.panResponder.panHandlers}
                        style={[{height: animatedHeaderHeight}, styles.basketBarContent]}>
                        <View
                            style={styles.basketBarContentHolder}>
                            <Animated.View
                                style={[{height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft}, styles.basketBarContentImgHolder]}>
                                <Image style={styles.basketBarContentImg} source={require('../../assets/Logo.png')}/>
                            </Animated.View>
                            <Animated.Text style={[{opacity: animatedTextOpacity}, styles.basketBarContentText]}>
                                4 items
                            </Animated.Text>
                            <Animated.Text style={[{opacity: animatedTextOpacity}, styles.basketBarContentText]}>
                                Total price: £19.85
                            </Animated.Text>
                        </View>
                        <Animated.View style={[{opacity: animatedTextOpacity}, styles.basketBarContentIcon]}>
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
        backgroundColor: colours.pureWhite
    },
    bar: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: colours.pureWhite,
        height: screenHeight
    },
    basketBarContent: {
        height: 100,
        borderTopWidth: 1,
        borderColor: colours.midGrey,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    basketBarContentHolder: {
        flex: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    basketBarContentImgHolder: {
    },
    basketBarContentImg: {
        flex: 1,
        width: null,
        height: null
    },
    basketBarContentText: {
        fontSize: 18,
        paddingLeft: 10
    },
    basketBarContentIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});


export default connect(null, null)(Checkout)
