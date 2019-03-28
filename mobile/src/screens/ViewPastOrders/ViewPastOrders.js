import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import * as colours from "./../../styles/colourScheme";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Card, ListItem } from "react-native-elements";
import SimpleCrypto from "simple-crypto-js";
import QRCode from "react-native-qrcode-svg";

class ViewPastOrders extends Component {
  state = {
    pastOrders: [],
    selectedOrder: null,
    showOrderOverlay: false
  };

  componentDidMount() {
    this.props.findUserOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        pastOrders: nextProps.pastOrders
      });
    }
  }

  toggleOrderOverlay = i => {
    let orderSelected = this.state.pastOrders[i];
    this.setState(prevState => {
      return {
        ...prevState,
        showOrderOverlay: !prevState.showOrderOverlay,
        selectedOrder: orderSelected
      };
    });
  };

  componentDidUpdate() {
    console.log("view past orders state", this.state);
  }

  qrCode = () => {

    const key = "zvBT1lQV1RO9fx6f8";
    const crypto = new SimpleCrypto(key);
    const token = crypto.encrypt(this.state.selectedOrder.collectionId);

    if (this.props.collectionId) {
      return <QRCode value={token} size={300} />;
    }
  };

  drinksLogic = order => {
    let drinksList = [];
    let finalList = [];
    order.drinks.map(drink => {
      drinksList.push(drink.name);
    });
    let individualDrinks = [...new Set(drinksList)];
    individualDrinks.map(drink => {
      const count = drinksList.reduce((n, val) => {
        return n + (val === drink);
      }, 0);
      finalList.push({ name: drink, quantity: count });
    });
    return finalList.map(drink => {
      return <Text key={index} style={styles.subInformationDrinksText}>
        {drink.quantity} x{drink.name}
        </Text>;
    });
  };

  render() {
    const spinner = this.props.ordersLoading ? (
      <ActivityIndicator size="large" color={colours.orange} />
    ) : null;
    let renderPastOrders = null;

    if (this.state.pastOrders) {
      renderPastOrders = this.state.pastOrders.map((order, i) => {
        let drinksList = [];
        let finalList = [];

        order.drinks.map(drink => {
          drinksList.push(drink.name);
        });

        let indiDrinks = [...new Set(drinksList)];
        indiDrinks.map(indi => {
          var count = drinksList.reduce(function(n, val) {
            return n + (val === indi);
          }, 0);
          finalList.push({ name: indi, quantity: count });
        });

        return (
          <TouchableOpacity onPress={() => this.toggleOrderOverlay(i)} key={i}>
            <Card
              key={i}
              title={
                order.transactionId
                  ? `#${order.transactionId.slice(0, 7).toUpperCase()}`
                  : `#${Math.random()
                      .toString(36)
                      .substring(2, 9)
                      .toUpperCase()}`
              }
              containerStyle={{ backgroundColor: colours.lightGrey }}
              titleStyle={{
                color: colours.midBlue,
                fontWeight: "bold",
                fontSize: 24
              }}
              dividerStyle={{ backgroundColor: colours.pureWhite }}
            >
              <ListItem
                key={i}
                titleStyle={{
                  color: colours.midnightBlack,
                  fontWeight: "bold"
                }}
                containerStyle={{ backgroundColor: colours.lightGrey }}
                title={`The Taf: ${order.collectionPoint.name}`}
                bottomDivider
                subtitle={
                  <View style={styles.subtitleView}>
                    <View style={{ paddingVertical: 5 }} />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          color: colours.midnightBlack,
                          fontWeight: "bold"
                        }}
                      >
                        Order Date :{" "}
                      </Text>
                      <Text style={styles.subInformationText}>
                        {new Date(order.date).toDateString()}
                      </Text>
                      {/* spacing */}
                      <Text> </Text>
                      <Text style={styles.subInformationText}>
                        {new Date(order.date).toTimeString().slice(0, 5)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          color: colours.midnightBlack,
                          fontWeight: "bold"
                        }}
                      >
                        Order Status
                      </Text>
                      <Text style={styles.subInformationTextPrice}>
                        {order.status}
                      </Text>
                    </View>

                    <View style={{ paddingVertical: 5 }} />

                    {finalList.map((drink, index) => (
                      <Text key={index} style={styles.subInformationDrinksText}>
                        {drink.quantity} x {drink.name}
                      </Text>
                    ))}

                    <View style={{ paddingVertical: 5 }} />

                    {/* on card press */}

                    {this.state.showOrderOverlay &&
                    this.state.selectedOrder._id === order._id ? (
                      <View>

                        {/* <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start"
                          }}
                        >
                          <Text
                            style={{
                              color: colours.midnightBlack,
                              fontWeight: "bold"
                            }}
                          >
                            Collection Point:{" "}
                            <Text style={{ color: colours.warningRed }}>
                              {`The Taf: ${
                                this.state.selectedOrder.collectionPoint.name
                              }`}
                            </Text>
                          </Text>
                        </View> */}

                        <View style={styles.qrCode}>{this.qrCode()}</View>
                      </View>
                    ) : null}
                  </View>
                }
              />
            </Card>
          </TouchableOpacity>
        );
      });

      return (
        <View style={[styles.container]}>
          <ScrollView>
            <View>
              {spinner}
              {renderPastOrders}
            </View>
            {/* <ShowOrder
                  visible={this.state.showOrderOverlay}
                  hideOrder={this.toggleOrderOverlay}
                  selectedOrder={this.state.selectedOrder}/> */}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: colours.midnightBlack,
    color: colours.white,
    flex: 1
  },
  containerText: {
    height: Dimensions.get("window").height / 6
  },
  text: {
    color: colours.white
  },
  subInformationText: {
    color: colours.darkGrey
  },
  subInformationDrinksText: {
    fontWeight: "bold",
    color: colours.midBlue
  },
  subInformationTextPrice: {
    color: colours.warningRed,
    fontWeight: "bold"
  },
  subtitleView: {
    paddingTop: 5
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
  qrCode: {
    backgroundColor: colours.pureWhite,
    alignSelf: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    findUserOrders: () => dispatch(actions.orderHistory())
  };
};

const mapStateToProps = state => {
  return {
    ordersLoading: state.order.loading,
    pastOrders: state.order.pastOrders
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPastOrders);
