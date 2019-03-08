import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import {ListItem, Card, Button, withBadge} from 'react-native-elements';
import * as colours from '../../styles/colourScheme';
import {connect} from 'react-redux';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Checkout extends Component {


    state = {
        isScrollEnabled: false,
        checkoutList: [
            {
                drinkName: 'Jameson Whisky',
                drinkSize: 'Double (50ml)',
                itemSpecifics: 'On the Rocks',
                quantity: 2,
                itemPrice: '£8.99'
            },
            {
                drinkName: 'Patron',
                drinkSize: 'Double (50ml)',
                itemSpecifics: 'No ice, lime or lemon please',
                quantity: 5,
                itemPrice: '£16.99'
            },
        ],
        basketQuantity: 7,
        basketBarHeight: screenHeight - 180
    };


    componentWillMount() {
        this.scrollOffset = 0;
        this.animation = new Animated.ValueXY({x:0, y: this.props.fullScreen ? 0 : this.state.basketBarHeight});

        // toggle this in state to auto open
        // this.animation = new Animated.ValueXY({x:0, y: 0});
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

        const BadgedIcon = withBadge(this.state.basketQuantity)(Icon);

        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        };

        const animatedImageHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [64, 32],
            extrapolate: 'clamp'
        });

        const animatedTextOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-500, screenHeight - 180],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        const animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [screenWidth/2-32, 15],
            extrapolate: 'clamp'
        });

        const animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [screenHeight/5, 90],
            extrapolate: 'clamp'
        });

        const animatedMainContentOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-500, screenHeight-90],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        const animatedBackgroundColor = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [colours.midnightBlack, colours.transparent],
            extrapolate: 'clamp'
        });

        const animatedSettingsHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-90],
            outputRange: [screenHeight/12, 90],
            extrapolate: 'clamp'
        });


        return (
            <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor }}>
                {this.props.children}
                <Animated.View
                    {...this._panResponder.panHandlers}
                    style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: colours.midnightBlack, height: screenHeight }]}

                >
                    <ScrollView
                        scrollEnabled={this.state.isScrollEnabled}
                        scrollEventThrottle={16}
                        onScroll={event => {
                            this.scrollOffset = event.nativeEvent.contentOffset.y
                        }}
                    >
                        <Animated.View
                            style={{ height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor:  colours.midnightBlack, flexDirection: 'row', alignItems: 'center' }}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                                    <Image style={{ flex: 1, width: null, height: null }}
                                           source={require('../../assets/Logo.png')} />
                                </Animated.View>

                            <Animated.View style={{ opacity: animatedTextOpacity, }}>
                                <Animated.Text style={{ opacity: animatedTextOpacity, fontSize: 18, paddingLeft: 10 }}>
                                    <Text style={styles.barOrderDetails1}>7 items    </Text>
                                    <Text style={styles.barOrderDetails2}>    £25.98 </Text>
                                </Animated.Text>
                            </Animated.View>
                            <Animated.View style={{ opacity: animatedTextOpacity, marginRight: 40 }}>
                                <BadgedIcon size={28} name="shopping-cart" color={colours.white}/>
                            </Animated.View>
                            </View>
                        </Animated.View>

                        <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedMainContentOpacity }}>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Order Summary</Text>
                            </View>

                            <Animated.View style={{ height: animatedSettingsHeight, opacity: animatedMainContentOpacity }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 20, paddingBottom: 20 }}>
                                    <Icon name="close" size={32} style={{ color: colours.orange }} />
                                    <Text style={styles.orderSummaryTitle}>Order Summary</Text>
                                    <Icon name="ellipsis-v" size={32} style={{ color: colours.orange, marginTop: 2}} />
                                </View>
                            </Animated.View>

                            <View style={{ height: screenHeight/3, width: screenWidth}}>
                                <View>
                                    <Card
                                        title="Spirits"
                                        containerStyle={{backgroundColor: colours.lightGrey}}
                                          titleStyle={{color: colours.midBlue, fontWeight: 'bold', fontSize: 24}}
                                          dividerStyle={{backgroundColor: colours.pureWhite}}>
                                    {
                                        this.state.checkoutList.map((l, i) => (
                                            <ListItem
                                                key={i}
                                                titleStyle={{color: colours.midnightBlack, fontWeight: 'bold'}}
                                                containerStyle={{backgroundColor: colours.lightGrey}}
                                                title={l.drinkName}
                                                bottomDivider
                                                subtitle={
                                                    <View style={styles.subtitleView}>
                                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                        <Text style={styles.subInformationText}>{l.drinkSize}</Text>
                                                            <Text style={styles.subInformationTextPrice}>{l.itemPrice}</Text>
                                                        </View>
                                                        <Text style={styles.subInformationText}>{l.itemSpecifics}</Text>
                                                    </View>
                                                }
                                                badge={{ badgeStyle: {backgroundColor: colours.midnightBlack}, value: l.quantity, textStyle: { color: colours.pureWhite}}}
                                            />
                                        ))
                                    }
                                    </Card>
                                </View>
                                <View>
                                    <Card
                                        containerStyle={{backgroundColor: colours.midnightBlack}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                        <Text style={styles.barOrderDetails1}>
                                            Total Items: 14
                                        </Text>
                                            <Text style={{ color: colours.pureWhite, fontSize: 30}}>
                                                |
                                            </Text>
                                        <Text style={styles.barOrderDetails2}>
                                            Total Price: £25.98
                                        </Text>
                                        </View>
                                    </Card>
                                </View>
                            </View>
                            <View style={{ height: (screenHeight/6)*3, justifyContent: 'center', alignItems: 'center'}}>
                                <Button
                                    ViewComponent={require('react-native-linear-gradient').default}
                                    icon={
                                        <Icon
                                            name="check-circle"
                                            size={24}
                                            color={colours.white}
                                            style={{
                                                marginLeft: 20,
                                            }}
                                        />
                                    }
                                    iconRight
                                    raised
                                    title="King It!"
                                    linearGradientProps={{
                                        colors: [colours.orange, colours.midBlue],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                    buttonStyle={{
                                        paddingLeft: (screenWidth/4),
                                        paddingRight: (screenWidth/4),
                                        paddingTop: 20,
                                        paddingBottom: 20,
                                        borderRadius: 20
                                }}
                                    titleStyle={{
                                        fontWeight: 'bold',
                                        fontSize: 24
                                    }}
                                />
                            </View>
                        </Animated.View>
                        <View style={{ height: 200 }} />
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
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    subInformationText: {
        paddingLeft: 10,
        color: colours.darkGrey
    },
    barOrderDetails1: {
        fontWeight: 'bold',
        color: colours.midGrey
    },
    barOrderDetails2: {
        fontWeight: 'bold',
        color: colours.orange
    },
    orderSummaryTitle: {
        fontWeight: 'bold',
        color: colours.pureWhite,
        fontSize: 32,
        textAlign: 'center'
    },
    subInformationTextPrice: {
        color: colours.warningRed,
        fontWeight: 'bold'
    }
});


export default connect(null, null)(Checkout)
