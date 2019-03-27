import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator, AsyncStorage
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as colours from "../../styles/colourScheme";
import { Navigation } from "react-native-navigation";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Modal from "react-native-modal";
import ButtonBackground from "../../components/UI/Buttons/ButtonWithBackground";
import jwt from "expo-jwt";

class OrderStatus extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    orderStatus: [],
    showQRCode: false,
    quantities: {},
    drinks: {}
  };

  async componentDidMount() {
    this.props.findOrderById(this.props.orderNumber);
    this.setState({
      accountName: await this.getAccountName()
    });
  }

  componentWillReceiveProps(nextProps) {
      if (!nextProps.loading) {
      this.setState({
        orderStatus: nextProps.orderStatus
      });
    }
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
    return await AsyncStorage.getItem("userId");
  };

  render() {
    let qrCode = null;
    const qrData = {
      userId: this.props.userId || this.state.accountName,
      collectionId: this.props.collectionId || this.props.orderStatus.findOrderById.collectionPoint.collectionPointId
    };
    const key = "zvBT1lQV1RO9fx6f8";
    const token = jwt.encode(
      {
        qrData
      },
      key
    );

    if ((this.props.userId || this.state.accountName ) && (this.props.collectionId || this.props.orderStatus.findOrderById.collectionPoint.collectionPointId)) {
      qrCode = <QRCode value={token} size={300} />;
    }

    const  drinkNames = [];
    const finalList = [];
    let orderPrice = 0;

    if (this.state.orderStatus.findOrderById){
        let stateDrinks = this.state.orderStatus.findOrderById.drinks;
        stateDrinks.map(drinks => {
          orderPrice += parseFloat(drinks.price)
          drinkNames.push(drinks.name)
        })
        let indiDrinks = [...new Set(drinkNames)];
        indiDrinks.map(indi => {
            var count = drinkNames.reduce(function(n, val) {
                return n + (val === indi);
            }, 0);
            finalList.push({drinkName:indi, quantity:count})
      });
    }

    return (
      <ScrollView style={styles.scroll}>
        <View style={[styles.container]}>
          {this.state.orderStatus.findOrderById ? (
            <View style={styles.header}>
              <Text style={styles.status}>Order Successful!</Text>
              <Text style={styles.success}>
                Thank You {this.state.orderStatus.findOrderById.userInfo.name}!
              </Text>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Status:</Text>
                <Text style={styles.orderSubtitle}>
                  {this.state.orderStatus.findOrderById.status}{" "}
                </Text>
                <Progress.Circle
                  size={30}
                  indeterminate={true}
                  color={colours.orange}
                  thickness={15}
                />
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Order Number :</Text>
                <Text style={styles.orderSubtitle}>
                  {this.state.orderStatus.findOrderById.collectionPoint.collectionPointId}{" "}
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Ordered at :</Text>
                <Text style={styles.date}>
                  {new Date(this.state.orderStatus.findOrderById.date)
                    .toTimeString()
                    .slice(0, 8)}
                </Text>
                <Text style={styles.date}>
                  {new Date(
                    this.state.orderStatus.findOrderById.date
                  ).toDateString()}
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Collection Point:</Text>
                <Text style={styles.orderSubtitle}>
                  {this.state.orderStatus.findOrderById.collectionPoint.name}
                  {this.state.orderStatus.findOrderById.collectionPoint.collectionPoindId}
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
                      <Text style={styles.orderSubtitle}>£HARD.CODE</Text>
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
              <Modal
                visible={this.state.showQRCode}
                onSwipeComplete={() => this.toggleQRCode()}
                swipeDirection="down"
                onBackdropPress={() => this.toggleQRCode()}
              >
                <View style={styles.modal}>
                  <Text style={styles.header}>
                    Order{" "}
                    <Text style={{ color: colours.orange }}>
                      #{this.props.collectionId}
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
                        {this.props.collectionPoint}
                      </Text>
                    </Text>
                    <Text style={styles.infoText}>
                      Order Time:{" "}
                      <Text style={{ color: colours.orange }}>
                        {new Date(this.props.date).toTimeString().slice(0, 5)}
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

          {/* </View> */}
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
    orderStatus: state.order.orderStatus
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
)(OrderStatus);
