import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, SwipeableFlatList, Image, Slider} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import {ListItem} from 'react-native-elements';
import * as colours from '../../styles/colourScheme';
import {connect} from 'react-redux';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Checkout extends Component {

    state = {
        isScrollEnabled: false
    };

    list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
    ];

    keyExtractor = (item, index) => index;

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{ source: { uri: item.avatar_url } }}
        />
    );

    componentWillMount() {
        this.scrollOffset = 0;
        this.animation = new Animated.ValueXY({x:0, y: screenHeight - 90});
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return (this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0;
            },
            onPanResponderGrant: (event, gestureState) => {
                this.animation.extractOffset();
            },
            onPanResponderMove: (event, gestureState) => {
                this.animation.setValue({x: 0, y: gestureState.dy})
            },
            onPanResponderRelease: (event, gestureState) => {
                if(gestureState.moveY > screenHeight - 120) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if (gestureState.moveY < 120) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if (gestureState.dy < 0) {
                    this.setState({isScrollEnabled: true});
                    Animated.spring(this.animation.y, {
                        toValue: -screenHeight + 140,
                        tension: 1
                    }).start();
                } else if (gestureState.dy > 0) {
                    this.setState({isScrollEnabled: false});
                    Animated.spring(this.animation.y, {
                        toValue: screenHeight - 140,
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
            inputRange: [0, screenHeight-90],
            outputRange: [screenHeight/2, 90],
            extrapolate: 'clamp'
        });

        const animatedMainContentOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-500, screenHeight-90],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        const animatedBackgroundColor = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [colours.midnightBlack, colours.pureWhite],
            extrapolate: 'clamp'
        });


        return (
            <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor }}>
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: 'white', height: screenHeight }]}

                >
                    <ScrollView
                        scrollEnabled={this.state.isScrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={event => {
                            this.scrollOffset = event.nativeEvent.contentOffset.y
                        }}
                    >
                        <Animated.View
                            style={{ height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor:  colours.midGrey, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                                    <Image style={{ flex: 1, width: null, height: null }}
                                           source={require('../../assets/Logo.png')} />
                                </Animated.View>
                            </View>
                            <Animated.View style={{ opacity: animatedTextOpacity, flex: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                <Animated.Text style={{ opacity: animatedTextOpacity, fontSize: 18, paddingLeft: 10 }}>4 items | £12.48 </Animated.Text>
                            </Animated.View>
                            <Animated.View style={{ opacity: animatedTextOpacity, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 10 }}>
                                <Icon name="shopping-cart" size={32} />
                            </Animated.View>
                        </Animated.View>

                        <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedMainContentOpacity }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Order Summary</Text>
                            </View>

                            <View style={{ height: 40, width: screenWidth, alignItems: 'center' }}>
                                <Text>Order Table</Text>
                            </View>

                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Icon name="reorder" size={40} />
                                <Icon name="check-circle" size={40} />
                                <Icon name="check-square" size={40} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                                <Icon name="close" size={32} style={{ color: colours.orange }} />
                                <Icon name="ellipsis-v" size={32} style={{ color: colours.orange }} />
                            </View>
                        </Animated.View>
                        <View style={{ height: 1000 }} />
                    </ScrollView>
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
        flex: 1
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
        height: null,
        paddingTop: 20
    },
    basketBarContentText: {
        fontSize: 18,
        paddingLeft: 10
    },
    basketBarContentIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    fullPageContentBox: {
        flex: 1
    },
    fullPageContentBoxHeaders: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    fullPageContentBoxHeadersControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    }
});


export default connect(null, null)(Checkout)
