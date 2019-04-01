import React, {Component} from 'react';
import {ActivityIndicator, Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import * as colours from "../../styles/colourScheme";
import NotificationService from "../../notifications/NotificationService";
import Icon from "react-native-vector-icons/Ionicons";
import {RNNotificationBanner} from "react-native-notification-banner";

const query = gql`
       query FindOrderById($id: ID!) {
                    findOrderById(id: $id) {
                        drinks {
                            name
                            category
                            price
                        }
                        collectionPoint {
                            name
                            collectionPointId
                        }
                        price
                        status
                        date
                        _id
                        collectionId
                        transactionId
                        userInfo{
                            email
                            name
                        }
                   }
                }
`;

const subscription = gql`
subscription {
  orderUpdated {
    _id
    status
  }
}
`;

let orderStatus;
class OrderStatusView extends Component {

    constructor(props) {
        super(props);
        this.notification = new NotificationService(this.onRegister.bind(this), this.onNotification.bind(this));
    }

    state = {
        notificationSent: false
    };

    componentWillMount() {
        this.unsubscribe = this.props.subscribeToMore();
    }

    componentWillReceiveProps(nextProps) {
        // check if the order for Active Order has changed
        if (nextProps.orderId !== orderStatus.orderId) {
            if (this.unsubscribe) {
                this.unsubscribe();
                // subscribe to new orderId
            }
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    onNotification = (notification) => {
        if (notification.foreground) {
            const drinkReady = <Icon name="ios-beer" size={24} color="#FFFFFF" family={"Ionicons"} />;
            RNNotificationBanner.Success({ onClick: this.props.showQRCode, title: `Order #${orderStatus.collectionId}: Ready for Collection`, subTitle: `Order is now available for collection from the ${orderStatus.collectionPoint.name} collection point`, withIcon: true, icon: drinkReady});
            this.setState({
                notificationSent: true
            })
        } else {
            this.props.showQRCode();
        }
    };

    onRegister = (token) => {
        Alert.alert("Registered !", JSON.stringify(token));
        this.setState({ registerToken: token.token, gcmRegistered: true });
    };

    render() {
        console.log(this.props);
        orderStatus = this.props.data.findOrderById;

        if (orderStatus.status === 'AWAITING_COLLECTION' && !this.state.notificationSent) {
            this.notification.scheduleNotification('Ready for Collection', this.props.barName, orderStatus.collectionId, orderStatus.collectionPoint.name);
        }

        return (
            orderStatus ? <View>
                <View style={styles.progressCircle}>
                    <Text style={styles.orderText}>Status:</Text>
                    <Text style={styles.orderSubtitle}>
                        {orderStatus.status}{" "}
                    </Text>
                </View>
                <View style={styles.progressCircle}>
                    <Text style={styles.orderText}>Collection Code :</Text>
                    <Text style={styles.orderSubtitle}>
                        #{orderStatus.collectionId}{" "}
                    </Text>
                </View>
                <View style={styles.progressCircle}>
                    <Text style={styles.orderText}>Ordered at :</Text>
                    <Text style={styles.date}>
                        {new Date(orderStatus.date)
                            .toTimeString()
                            .slice(0, 8)}
                    </Text>
                    <Text style={styles.date}>
                        {new Date(
                            orderStatus.date
                        ).toDateString()}
                    </Text>
                </View>
                <View style={styles.progressCircle}>
                    <Text style={styles.orderText}>Collection Point:</Text>
                    <Text style={styles.orderSubtitle}>
                        {orderStatus.collectionPoint.name}
                    </Text>
                </View>
                <Text style={styles.orderText}>
                    Estimated Collection Time : 10:59pm
                </Text>
            </View> : <ActivityIndicator size="large" color={colours.orange} />
        );
    }
}

const styles = StyleSheet.create({
    progressCircle: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    padd: {
        marginTop: 25
    },
    receipt: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    scroll: {
        backgroundColor: colours.midnightBlack
    },
    right: {
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    box: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderColor: colours.cream,
        borderWidth: 2
    },
    orderInfo: {
        paddingTop: 10,
        paddingRight: 10
    },
    status: {
        fontSize: 24,
        fontWeight: "800",
        color: colours.cream,
        padding: 10
    },
    success: {
        fontSize: 20,
        fontWeight: "600",
        // color: colours.cream,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        color: colours.orange,
        marginBottom: 25
    },
    date: {
        fontSize: 16,
        fontWeight: "600",
        color: colours.orange,
        padding: 10
    },
    orderText: {
        fontSize: 16,
        fontWeight: "400",
        color: colours.cream,
        padding: 10
    },
    orderSubtitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colours.cream,
        padding: 10
    },
    container: {
        paddingTop: 10,
        backgroundColor: colours.midnightBlack,
        color: colours.white,
        flex: 1
    },
    actContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    qrCode: {
        backgroundColor: colours.pureWhite,
        alignSelf: 'center',
    },
    containerText: {
        height: Dimensions.get("window").height / 6
    },
    text: {
        color: colours.white
    },
    button: {
        alignSelf: "center",
        width: Dimensions.get("window").width / 2
    },
    header: {
        color: colours.midnightBlack,
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
        justifyContent: "center"
    },
    modal: {
        backgroundColor: colours.pureWhite,
        padding: 40
    },
    infoText: {
        fontSize: 12,
        color: colours.midGrey
    }
});

const OrderStatus = props => {
    console.log(props);
    return <Query query={query} variables={{id: props.orderId}}>
        {({loading, error, data, subscribeToMore}) => {
            if (loading) return <Text style={{color: 'white'}}>Loading...</Text>;
            if (error) {
                console.log(error);
                return <Text style={{color: 'white'}}>Error: {error.message}</Text>;
            }
            const more = () => subscribeToMore({
                document: subscription,
                updateQuery: (prev, {subscriptionData}) => {
                    if (!subscriptionData.data) return prev;
                    return null;
                },
            });
            return <OrderStatusView orderId={props.orderId} barName={props.barName} showQRCode={props.showQRCode} data={data} subscribeToMore={more}/>;
        }}
    </Query>
};

export default OrderStatus;
