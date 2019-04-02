import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, TouchableOpacity, Alert, TouchableHighlight, ActivityIndicator, AsyncStorage, Platform} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/FontAwesome";
import Accordion from 'react-native-collapsible/Accordion';
import {ListItem, Card, withBadge} from 'react-native-elements';
import * as colours from '../../../styles/colourScheme';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions/index"
import ApplePay from '../../../assets/apple-pay.svg';
import ButtonBackground from '../../UI/Buttons/ButtonWithBackground';
import Payment from '../../UI/Overlays/Payment';
import AuthOverlay from '../../UI/Overlays/AuthOverlay';
import {showLoginOnNotificationPress} from "../../../utility/navigation";
import {RNNotificationBanner} from "react-native-notification-banner";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Checkout extends Component {

    state = {
        isScrollEnabled: false,
        basketBarHeight: screenHeight - (Dimensions.get('window').height / 4.4),
        activeSections: [],
        multipleSelect: true,
        editVisible: false,
        emptyBasketChecked: false,
        showPaymentOverlay: false,
        collectionPoint: "",
        userId: null,
        notificationSent: false,
        showAuthOverlay: false
    };


    componentWillMount() {
        this.scrollOffset = 0;
        this.animation = new Animated.ValueXY({x:0, y: this.props.fullScreen ? 0 : this.state.basketBarHeight});

        // toggle this in state to auto open
        // this.animation = new Animated.ValueXY({x:0, y: 0});
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return (!this.state.showPaymentOverlay && this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || !this.state.isScrollEnabled && gestureState.dy < 0;
            },
            onPanResponderGrant: (event, gestureState) => {
                this.animation.extractOffset();
            },
            onPanResponderMove: (event, gestureState) => {
                this.animation.setValue({x: 0, y: gestureState.dy})
            },
            onPanResponderRelease: (event, gestureState) => {
                if(gestureState.moveY > screenHeight - (screenHeight * 180/812)) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if (gestureState.moveY < (screenHeight * 0.180/812)) {
                    Animated.spring(this.animation.y, {
                        toValue: 0,
                        tension: 1
                    }).start();
                } else if (gestureState.dy < 0) {
                    this.setState({isScrollEnabled: true});
                    Animated.spring(this.animation.y, {
                        toValue: -screenHeight + (screenHeight * 140/812),
                        tension: 1
                    }).start();
                } else if (gestureState.dy > 0) {
                    this.setState({isScrollEnabled: false});
                    Animated.spring(this.animation.y, {
                        toValue: screenHeight - (screenHeight * 140/812),
                        tension: 1
                    }).start();
                }
            }
        })
    }

    async componentDidMount() {
        this.props.findCollectionPoints();
        this.getAccountName().then(value => {
            this.setState({
                userId: value
            })
        })
    }

    getAccountName = async () => {
        return await AsyncStorage.getItem("userId");
      };

    getBarId = async () => {
        return await AsyncStorage.getItem("barId");
    }
    showNotification() {
        let icon = <Icon name="user" size={24} color="#FFFFFF" family={"FontAwesome"} />;
        RNNotificationBanner.Normal({duration: 8, onClick: () => this.handleNotificationPress(),  title: `You Are Not Signed In to DrinKing`, subTitle: `Tap here to sign in or alternatively enter your email below.`, withIcon: true, icon: icon});
    }

    handleNotificationPress = async () =>  {
        Promise.all([
            Icon.getImageSource(
                Platform.OS === "android" ? "remove" : "remove",
                30
            )
          ]).then(sources => {
              showLoginOnNotificationPress(this.getBarId(), sources[0]);
          })
    };
    addValue = () => {
    };

    collectionPoints = () => {
        let collectionPoints = [];
        if (this.props.collectionPoint.collectionPoints){
            this.props.collectionPoint.collectionPoints.map(
                cps => {
                    collectionPoints.push({name: cps.name, id: cps._id})
                }
            )
        }
        return collectionPoints;
    };

    basketItems = () => {
        let totalItems = 0;
        if (this.props.basket) {
            this.props.basket.map(drink => {
                totalItems += drink.quantity
            });
        }
        return totalItems;
    };

    basketPrice = () => {
        let totalPrice = 0;
        if (this.props.basket) {
            this.props.basket.map(drink => {
                totalPrice += (drink.price /100 * drink.quantity);
            });
        }
        return (totalPrice/100).toFixed(2);
    };

    totalPrice = () => {
        const basketPrice = this.basketPrice();
        let stripeFee = 0;
        if (basketPrice < 5) {
            stripeFee = (basketPrice * 1.0014) + 0.2;
        }
        const totalCost = stripeFee;
        return totalCost.toFixed(2);
    };

    onEditPress = () => {
        this.setState({
            editVisible : !this.state.editVisible
        });
    };

    onSubmitOrder = (paymentInfo) => {
        const basketPrice = this.basketPrice()*100;
        const totalPrice = this.totalPrice()*100;
        const stripeFee = totalPrice - basketPrice;
        this.props.submitOrder(this.props.basket, this.props.componentId, paymentInfo, totalPrice, stripeFee);
        this.setState({
            showPaymentOverlay: false
        });
    };

    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                transition="backgroundColor"
            >
                <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
                    {this.props.basket.filter(basketItem => basketItem.category === section).map((drink, i) => (
                        <TouchableOpacity key={i}>
                    <ListItem
                        key={i}
                        titleStyle={{color: colours.midnightBlack, fontWeight: 'bold'}}
                        containerStyle={{backgroundColor: colours.lightGrey}}
                        title={drink.name}
                        bottomDivider
                        subtitle={
                            <View style={styles.subtitleView}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.subInformationText}>{drink.nutritionInfo}</Text>
                                    <Text style={styles.subInformationTextPrice}>£{(drink.price /100 * drink.quantity).toFixed(2)}</Text>
                                </View>
                            </View>
                        }
                        badge={{ badgeStyle: {backgroundColor: colours.midnightBlack}, value: drink.quantity, textStyle: { color: colours.pureWhite}}}
                        />

                        {this.state.editVisible ?
                            <View style={styles.editContainer}>
                            <Icon name="trash-o" style={styles.trash} size={30} color={colours.orange}/>
                            <View style={{justifyContent: 'flex-start', flexDirection: 'row'}}>
                            <TouchableOpacity onPress={()=>{this.addValue()}}>
                            <Icon name="plus-circle" style={styles.trash} size={30} color={colours.orange} />
                            </TouchableOpacity>
                            <Icon name="minus-circle" style={styles.trash} size={30} color={colours.orange}/>
                            </View>
                            </View>
                            : null}
                            </TouchableOpacity>
                    ))
                    }
                </Animatable.View>
            </Animatable.View>
        );
    };

    setSections = (sections, option) => {
        if (option === 'all') {
            for (let i in this.props.basketCategories) {
                this.setState(prevState => {
                    if (prevState.activeSections.length > 1) {
                        return {
                            ...prevState,
                            activeSections: []
                        }
                    } else {
                        return {
                            ...prevState,
                            activeSections: prevState.activeSections.concat(parseInt(i))
                        };
                    }
                });
            }
        } else {
            this.setState({
                activeSections: sections.includes(undefined) ? [] : sections,
            });
        }
    };

    togglePaymentOverlay = async () => {
            this.getAccountName().then((value) => {
                this.setState({
                    userId: value
                });
                if (value == null && !this.state.notificationSent && this.state.showPaymentOverlay){
                    this.showNotification();
                }
            });
        this.setState(prevState => {
            return {
                ...prevState,
                showPaymentOverlay: !prevState.showPaymentOverlay,
            }
    })
};

    toggleAuthOverlay = async () => {
        this.setState(prevState => {
            return {
            ...prevState,
            showAuthOverlay: !prevState.showAuthOverlay
            }
        })
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                style={[styles.header, isActive ? styles.active : styles.inactive]}
                transition="backgroundColor"
            >
                <View style={styles.headerStyles}>
                    <Text style={styles.headerText}>{section}</Text>
                </View>
            </Animatable.View>
        );
    };

    showApplePayAlert = () => {
        Alert.alert(
            'ApplePay Not Available',
            'Please try again soon when we hope to have Apple Pay supported.\n\nTap OK to Pay with Card instead.',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.togglePaymentOverlay()},
            ],
            {cancelable: false},
        );
    };

    render() {
        const { activeSections } = this.state;

        const BadgedIcon = withBadge(this.basketItems())(Icon);

        const animatedHeight = {
            transform: this.animation.getTranslateTransform()
        };

        const animatedImageHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 90/812)],
            outputRange: [64, 32],
            extrapolate: 'clamp'
        });

        const animatedTextOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 500/812), screenHeight - (screenHeight * 180/812)],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp'
        });

        const animatedImageMarginLeft = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 90/812)],
            outputRange: [screenWidth/2-(screenWidth * 32/414), screenWidth * 15/414],
            extrapolate: 'clamp'
        });

        const animatedHeaderHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 90/812)],
            outputRange: [screenHeight/5, screenHeight * 90/812],
            extrapolate: 'clamp'
        });

        const animatedMainContentOpacity = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 500/812), screenHeight-(screenHeight * 90/812)],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp'
        });

        const animatedBackgroundColor = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 90/812)],
            outputRange: [colours.midnightBlack, colours.transparent],
            extrapolate: 'clamp'
        });

        const animatedSettingsHeight = this.animation.y.interpolate({
            inputRange: [0, screenHeight-(screenHeight * 90/812)],
            outputRange: [screenHeight/12, screenHeight * 90/812],
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
                                           source={require('../../../assets/Logo.png')} />
                                </Animated.View>

                            <Animated.View style={{ opacity: animatedTextOpacity, }}>
                                <Animated.Text style={{ opacity: animatedTextOpacity, fontSize: 18, paddingLeft: 10 }}>
                                    <Text style={styles.barOrderDetails1}>Drinks: {this.basketItems()}        </Text>
                                    <Text style={styles.barOrderDetails2}>    £{this.basketPrice()} </Text>
                                </Animated.Text>
                            </Animated.View>
                            <Animated.View style={{ opacity: animatedTextOpacity, marginRight: 40 }}>
                                <BadgedIcon size={28} name="shopping-basket" color={colours.white}/>
                            </Animated.View>
                            </View>
                        </Animated.View>

                        <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedMainContentOpacity }}>

                            <Animated.View style={{ height: animatedSettingsHeight, opacity: animatedMainContentOpacity }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                                    <Icon name="trash-o" size={32} style={{ color: colours.orange }} onPress={() => this.props.emptyBasket()}/>
                                    <Text style={styles.orderSummaryTitle} onPress={() => this.setSections(null, 'all')}>Your Basket</Text>
                                    <Icon name="ellipsis-h" size={32} style={{ color: colours.orange, marginTop: 2}} onPress={()=> this.onEditPress()}/>
                                </View>
                            </Animated.View>

                            <View style={{ height: screenHeight/3, width: screenWidth}}>
                            <View>
                                    <Card
                                        containerStyle={{backgroundColor: colours.midnightBlack}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                        <Text style={styles.barOrderDetails1}>
                                            Total Items: {this.basketItems()}
                                        </Text>
                                            <Text style={{ color: colours.midGrey, fontSize: 30}}>
                                                |
                                            </Text>
                                        <Text style={styles.barOrderDetails2}>
                                            Total Price: £{this.basketPrice()}
                                        </Text>
                                        </View>
                                    </Card>
                                </View>
                            </View>
                        </Animated.View>
                        <View style={{ height: (100 + (100*this.props.basket.length)) }}>
                            <Accordion
                                activeSections={activeSections}
                                sections={this.props.basketCategories}
                                touchableComponent={TouchableOpacity}
                                expandMultiple={this.state.multipleSelect}
                                renderHeader={this.renderHeader}
                                renderContent={this.renderContent}
                                duration={400}
                                onChange={this.setSections}
                            />

                            {this.state.showAuthOverlay ?
                            <AuthOverlay
                                visible={this.state.showAuthOverlay}
                                onCancel={this.toggleAuthOverlay}
                                hideAuth={this.toggleAuthOverlay}
                                />
                            : null}

                            <Payment
                                visible={this.state.showPaymentOverlay}
                                basketItems={this.basketItems()}
                                basketPrice={this.basketPrice()}
                                totalPrice={this.totalPrice()}
                                collectionPoints={this.collectionPoints()}
                                onCancel={this.togglePaymentOverlay}
                                submitOrder={this.onSubmitOrder}
                                hidePayment={this.togglePaymentOverlay}/>
                            {this.basketItems() > 0 && !this.props.orderInProgress ?
                            <View style={{marginTop: 20}}>
                                    <View style={styles.paymentButtons}>
                                        <TouchableHighlight>
                                            <ButtonBackground color={colours.orange} textColor={colours.pureWhite} onPress={() => this.togglePaymentOverlay()}>
                                                Pay with Card
                                            </ButtonBackground>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => this.showApplePayAlert()} style={styles.applePayButton}>
                                           <ApplePay width={Dimensions.get('window').width/4} height={Dimensions.get('window').height/8}/>
                                        </TouchableHighlight>
                                    </View>
                                    </View>
                                : this.props.orderInProgress ?
                                    <View>
                                        <Text style={styles.emptyBasketHeader}>Your Order is being Processed...</Text>
                                        <ActivityIndicator size={"large"} color={colours.orange}/>
                                    </View>
                                    :
                                    <View style={styles.emptyBasket}>
                                    <Text style={styles.emptyBasketHeader}>Your Basket is Empty...</Text>
                                    <Text style={styles.emptyBasketText}>Explore the thirst quenching drinks on offer in the menus</Text>
                                </View> }
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    editContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 10
    },
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
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: colours.midnightBlack,
        backgroundColor: colours.cream,
    },
    headerStyles: {
        backgroundColor: colours.white,
        borderBottomColor: colours.midnightBlack,
        borderBottomWidth: 5,
        borderTopColor: colours.midnightBlack,
        borderTopWidth: 5
    },
    applePayButton: {
    },
    paymentButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    emptyBasketHeader: {
        textAlign: 'center',
        color: colours.pureWhite,
        fontSize: 36,
        fontWeight: 'bold',
        margin: 20
    },
    emptyBasketText: {
        textAlign: 'center',
        fontSize: 24,
        color: colours.midGrey,
        margin: 20
    }
});

const mapStateToProps = state => {
    return {
        basket: state.basket.basket,
        basketCategories: state.basket.categories,
        collectionPoint: state.collectionPoint,
        orderInProgress: state.order.orderInProgress
    }
};

const mapDispatchToProps = dispatch => {
    return {
      submitOrder: (basket, componentId, paymentInfo, totalPrice, stripeFee) => dispatch(actions.submitOrder(basket, componentId, paymentInfo, totalPrice, stripeFee)),
      emptyBasket: () => dispatch(actions.emptyBasket()),
      findCollectionPoints: () => dispatch(actions.findCollectionPoints())
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
