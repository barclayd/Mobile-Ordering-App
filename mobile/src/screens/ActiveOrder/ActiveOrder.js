import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
  ActivityIndicator, AsyncStorage, Platform
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as colours from "../../styles/colourScheme";
import { Navigation } from "react-native-navigation";
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icon from 'react-native-vector-icons/Ionicons'
import IconFa from 'react-native-vector-icons/FontAwesome'
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import {showQRCodeOnNotificationPress} from '../../utility/navigation';
import * as actions from "../../store/actions/index";
import Modal from "react-native-modal";
import ButtonBackground from "../../components/UI/Buttons/ButtonWithBackground";
import NotificationService from '../../../src/notifications/NotificationService';
import appConfig from '../../../app.json';
import SimpleCrypto from "simple-crypto-js";

class ActiveOrder extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    this.notification= new NotificationService(this.onRegister.bind(this), this.onNotification.bind(this));
  }

  state = {
    orderStatus: [],
    showQRCode: this.props.showQRCode ? this.props.showQRCode : false,
    quantities: {},
    drinks: {},
    senderId: appConfig.senderID,
    screenActive: false
  };

  async componentDidMount() {
    const orderNumber = await this.getOrderDetails();
    if (this.props.orderNumber) {
      this.props.findOrderById(this.props.orderNumber);
    } else {
      this.props.findOrderById(orderNumber);
    }
    this.setState({
      accountName: await this.getAccountName(),
      barName: await this.getBarName()
    });
  }

  componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
      this.setState({
        orderStatus: nextProps.orderStatus
      });
    }
  }

  componentDidAppear() {
    this.setState({
      screenActive: true
    });
  }

  componentDidDisappear() {
    this.setState({
      screenActive: false
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "menuButton") {
      !this.isSideDrawerVisible
        ? (this.isSideDrawerVisible = true)
        : (this.isSideDrawerVisible = false);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
    if (buttonId === "close") {
      Navigation.dismissModal(this.props.componentId);
    }
    if (buttonId === "profileButton") {
      !this.isSideDrawerVisible
        ? (this.isSideDrawerVisible = true)
        : (this.isSideDrawerVisible = false);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          right: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
  }

  toggleQRCode = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showQRCode: !prevState.showQRCode
      };
    });
  };

  getAccountName = async () => {
    return await AsyncStorage.getItem("name");
  };

  getOrderDetails = async () => {
    return await AsyncStorage.getItem("orderId");
  };

  getBarName = async () => {
    return await AsyncStorage.getItem("barName");
  };

  onNotification = (notification) => {
    if (notification.foreground) {
      let drinkReady = <Icon name="ios-beer" size={24} color="#FFFFFF" family={"Ionicons"} />;
      RNNotificationBanner.Success({ onClick: this.showQRCode, title: `Order #${this.state.orderStatus.collectionId}: Ready for Collection`, subTitle: `Order is now available for collection from ${this.state.orderStatus.collectionPoint.name} collection point`, withIcon: true, icon: drinkReady})
    } else {
      this.showQRCode();
    }
  };

  showQRCode = async () => {
    if (!this.state.showQRCode && !this.state.screenActive) {
      Promise.all([
        IconFa.getImageSource(
            Platform.OS === "android" ? "close" : "close",
            30
        )
      ]).then(sources => {
          showQRCodeOnNotificationPress(true, this.props.collectionId, sources[0]);
      })
    } else {
      this.setState({
        showQRCode: true
      })
    }
  };

  onRegister = (token) => {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  };

  render() {
    let qrCode = null;
    const key = "zvBT1lQV1RO9fx6f8";
    const crypto = new SimpleCrypto(key);
    const token = crypto.encrypt(this.props.collectionId);

    if (this.props.collectionId) {
      qrCode = <QRCode value={token} size={300} />;
    }
    const  drinkNames = [];
    const finalList = [];
    let orderPrice = 0;

    if (this.state.orderStatus.drinks){
        let stateDrinks = this.state.orderStatus.drinks;
        stateDrinks.map(drinks => {
          orderPrice += parseFloat(drinks.price);
          drinkNames.push(drinks.name);
        });
        let individualDrinks = [...new Set(drinkNames)];
        individualDrinks.map(indi => {
            const count = drinkNames.reduce((n, val) => {
                return n + (val === indi);
            }, 0);
            finalList.push({drinkName:indi, quantity:count});
      });
    }

    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container]}>
          {this.state.orderStatus.transactionId ? (
            <View style={styles.header}>
              <Text style={styles.status}>Order Successful!</Text>
              <Text style={styles.success}>
                Thank You {this.state.accountName}!
              </Text>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Status:</Text>
                <Text style={styles.orderSubtitle}>
                  {this.state.orderStatus.status}{" "}
                </Text>
                <Progress.Circle
                  size={30}
                  indeterminate={true}
                  color={colours.orange}
                  thickness={15}
                />
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Collection Code :</Text>
                <Text style={styles.orderSubtitle}>
                  #{this.state.orderStatus.collectionId}{" "}
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Ordered at :</Text>
                <Text style={styles.date}>
                  {new Date(this.state.orderStatus.date)
                    .toTimeString()
                    .slice(0, 8)}
                </Text>
                <Text style={styles.date}>
                  {new Date(
                    this.state.orderStatus.date
                  ).toDateString()}
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Collection Point:</Text>
                <Text style={styles.orderSubtitle}>
                  {this.state.orderStatus.collectionPoint.name}
                </Text>
              </View>
              <Text style={styles.orderText}>
                Estimated Collection Time : 10:59pm
              </Text>
              <Text style={[styles.status, styles.padd]}>Order Summary</Text>

              {finalList.map((drinks, i) => {
                return (

                  <View key={i} style={styles.receipt}>
                    <View>
                      <Text style={styles.orderSubtitle}>
                        {drinks.quantity} x {drinks.drinkName}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.orderSubtitle}>{drinks.price}</Text>
                    </View>
                  </View>
                );
              })}

              <View style={styles.receipt}>
                <Text style={styles.orderText}>Sub Total</Text>
                <Text style={styles.orderText}>£{orderPrice}</Text>
              </View>

              <View style={styles.button}>
                <ButtonBackground
                  color={colours.orange}
                  onPress={() => this.toggleQRCode()}
                  textColor={colours.pureWhite}
                >
                  Show QR Code
                </ButtonBackground>
              </View>
              <View style={styles.button}>
                <ButtonBackground
                    color={colours.midGrey}
                    onPress={() => this.notification.scheduleNotification('Ready for Collection', this.state.barName, this.state.orderStatus.collectionId, this.state.orderStatus.collectionPoint.name)}
                    textColor={colours.midnightBlack}
                >
                  Send Notification Reminder
                </ButtonBackground>
              </View>
              <Modal
                isVisible={this.state.showQRCode}
                backdropOpacity={0.85}
                onSwipeComplete={() => this.toggleQRCode()}
                swipeDirection="down"
                onBackdropPress={() => this.toggleQRCode()}
              >
                <View style={styles.modal}>
                  <Text style={styles.header}>
                    Order{" "}
                    <Text style={{ color: colours.orange }}>
                      #{this.state.orderStatus.collectionId ? this.state.orderStatus.collectionId : this.props.collectionId}
                    </Text>{" "}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      marginBottom: 40
                    }}
                  >
                    <Text style={styles.infoText}>
                      Collection:{" "}
                      <Text style={{ color: colours.orange }}>
                        {this.props.orderStatus.collectionPoint.name}
                      </Text>
                    </Text>
                    <Text style={styles.infoText}>
                      Order Time:{" "}
                      <Text style={{ color: colours.orange }}>
                        {new Date(this.props.orderStatus.date).toTimeString().slice(0, 5)}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.qrCode}>{qrCode}</View>
                </View>
              </Modal>
            </View>
          ) : (
            <View style={styles.actContainer}>
              <ActivityIndicator size="large" color={colours.orange} />
            </View>
          )}
        </View>
      </ScrollView>
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

const mapStateToProps = state => {
  return {
    orderStatus: state.order.orderStatus,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    findOrderById: id => dispatch(actions.orderStatus(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveOrder);
