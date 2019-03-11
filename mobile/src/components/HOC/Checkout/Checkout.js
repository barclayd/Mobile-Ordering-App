import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from "react-native-vector-icons/FontAwesome";
import Accordion from 'react-native-collapsible/Accordion';
import {ListItem, Card, Button, withBadge} from 'react-native-elements';
import * as colours from '../../../styles/colourScheme';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions/index"
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

class Checkout extends Component {

    state = {
        isScrollEnabled: false,
        basketBarHeight: screenHeight - 180,
        activeSections: [],
        multipleSelect: true,
        editVisible: false
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

    basketItems = () => {
    let totalItems = 0;
    this.props.basket.map(drink => {
          totalItems += drink.quantity
      });
    return totalItems;
    };

    basketPrice = () => {
        let totalPrice = 0;
        this.props.basket.map(drink => {
            totalPrice += (drink.price * drink.quantity);
        });
        return totalPrice.toFixed(2);
    };

    onEditPress = () => {
        this.setState({
            editVisible : !this.state.editVisible
        })

        console.log("eidt button",this.state.editVisible)
    }

    addValue = () => {
        console.log("addValue")
    }

    processOrder = () => {
        console.log("processOrder");
        console.log("this.props.basket",this.props.basket)
        console.log("price",this.basketPrice())
    }

    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                duration={400}
                transition="backgroundColor"
            >
                <Animatable.View animation={isActive ? 'bounceIn' : undefined}>
                    {this.props.basket.filter(basketItem => basketItem.category === section).map((drink, i) => (
                        <View key={i}>
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
                                    <Text style={styles.subInformationTextPrice}>£{(drink.price * drink.quantity).toFixed(2)}</Text>
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
                            </View>
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

    render() {
        const { activeSections } = this.state;

        const BadgedIcon = withBadge(this.basketItems())(Icon);

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
                                           source={require('../../../assets/Logo.png')} />
                                </Animated.View>

                            <Animated.View style={{ opacity: animatedTextOpacity, }}>
                                <Animated.Text style={{ opacity: animatedTextOpacity, fontSize: 18, paddingLeft: 10 }}>
                                    <Text style={styles.barOrderDetails1}>{this.basketItems()} Drinks   </Text>
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
                                    <Icon name="close" size={32} style={{ color: colours.orange }} />
                                    <Text style={styles.orderSummaryTitle} onPress={() => this.setSections(null, 'all')}>Order Summary</Text>
                                    <Icon name="ellipsis-v" size={32} style={{ color: colours.orange, marginTop: 2}} onPress={()=> this.onEditPress()}/>
                                </View>
                            </Animated.View>

                            {this.basketItems() > 0 ?
                                <View style={{marginTop: 20}}>
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
                                    onPress={()=>{this.props.submitOrder(this.props.basket, this.props.componenetId)}}
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
                            : null }

                            <View style={{ height: screenHeight/3, width: screenWidth}}>
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
                            
                            {/* <View style={{ height: (screenHeight/6), justifyContent: 'center', alignItems: 'center'}}>
                                
                            </View> */}
                        </Animated.View>
                        <View style={{ height: 1000 }} />
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
    }
});

const mapStateToProps = state => {
    return {
        basket: state.basket.basket,
        basketCategories: state.basket.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
      submitOrder: (basket, componenetId) =>
        dispatch(actions.submitOrder(basket, componenetId))
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
