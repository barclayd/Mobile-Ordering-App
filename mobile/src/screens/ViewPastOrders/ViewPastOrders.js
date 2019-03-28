import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  TextInput
} from "react-native";
import validate from "../../utility/validation";
import Icon from "react-native-vector-icons/FontAwesome";
import * as colours from "./../../styles/colourScheme";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Card, ListItem } from "react-native-elements";
// import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import jwt from "expo-jwt";
import QRCode from "react-native-qrcode-svg";

const dates = [
  {
    label: "Football",
    value: "football"
  },
  {
    label: "Baseball",
    value: "baseball"
  },
  {
    label: "Hockey",
    value: "hockey"
  }
];

class componentName extends Component {
  state = {
    pastOrders: [],
    selectedOrder: null,
    showOrderOverlay: false,
    arrayHolder: [],
    currentDate: new Date(),
    isDateTimePickerVisible: false,
    dates: {
      value: null
    },
    showFilters: false,
    input: {
      orderId: {
        value: null,
        valid: false,
        validationRules: {
          minLength: 7
        }
      }
    }
  };

  componentDidMount() {
    this.props.findUserOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        pastOrders: nextProps.pastOrders,
        arrayHolder: nextProps.pastOrders
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

  qrcode = () => {
    userId = AsyncStorage.getItem("userId");
    if (this.state.selectedOrder && userId) {

      let qrCode = null;
      const qrData = {
        userId: this.state.accountName,
        collectionId: this.state.selectedOrder.collectionPoint.collectionPointId
      };

      const key = "zvBT1lQV1RO9fx6f8";
      const token = jwt.encode(
        {
          qrData
        },
        key
      );

      if (
        userId &&
        this.state.selectedOrder.collectionPoint.collectionPointId
      ) {
        return <QRCode value={token} size={300} />;
      }
    }
  };

  drinksLogic = order => {
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
    return finalList.map(drink => {
      <Text key={index} style={styles.subInformationDrinksText}>
        {drink.quantity} x{drink.name}
      </Text>;
    });
  };

  showFilters = () => {
    this.setState({
      showFilters: !this.state.showFilters
    });
  };

  inputUpdateHandler = (key, value) => {
    this.setState(prevState => {
      return {
        input: {
          ...prevState.input,
          [key]: {
            ...prevState.input[key],
            value: value,
            valid: validate(value, prevState.input[key].validationRules)
          }
        }
      };
    });

    const newData = this.state.arrayHolder.filter(order => {
      const itemData = order.transactionId.slice(0, 7).toLowerCase();
      const text = value.toLowerCase();
      return itemData.indexOf(text) > -1;
    });
    this.setState({
      pastOrders: newData
    });
  };

  _DateTimePicker = () =>
      this.setState({
        isDateTimePickerVisible: !this.state.isDateTimePickerVisible
      });

    _handleDatePicked = date => {
      console.log("A date has been picked: ", date);
      this._DateTimePicker();
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
                        <View style={styles.qrCode}>{this.qrcode()}</View>
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
          <View>
            <TouchableOpacity
              style={styles.filters}
              onPress={() => this.showFilters()}
            >
              <Text style={{ color: colours.pureWhite, fontSize: 16 }}>
                Filters
              </Text>
              <Icon
                name="chevron-down"
                size={22}
                color={colours.pureWhite}
                style={{ top: -3 }}
              />
            </TouchableOpacity>

            {this.state.showFilters ? (
              <View>
                <TextInput
                  placeholder="Filter by Order Id..."
                  value={this.state.input.orderId.value}
                  style={[
                    styles.input,
                    {
                      borderColor:
                        this.state.pastOrders.length > 0
                          ? colours.white
                          : colours.warningRed
                    }
                  ]}
                  placeholderTextColor={colours.white}
                  maxLength={7}
                  autoCorrect={false}
                  selectionColor={colours.orange}
                  onChangeText={val => this.inputUpdateHandler("orderId", val)}
                />

                <View style={{ paddingVertical: 5 }} />

                <TouchableOpacity onPress={() => this._DateTimePicker()}>
                  <Text style={{color: colours.pureWhite, fontSize: 16}}>Show DatePicker</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={() => this._handleDatePicked()}
                  onCancel={() => this._DateTimePicker()}
                />

                {/* <View style={{flexDirection: "row", justifyContent: "center", top: 0, width: (Dimensions.get("window").width) / 1.09,}}>
                <RNPickerSelect
                placeholder={{label: "Filter date", value: null, color: colours.pureWhite}}
                items={dates}
                onValueChange={(value) => {
                            this.setState({
                                ...dates,
                                dates: {
                                    value: value
                                }
                            })
                }}
                style={{
                color: colours.pureWhite,
                fontSize: 16,
                borderColor: colours.pureWhite,
                borderWidth:1
                }}
                value={this.state.favSport0}
                />
            </View> */}
              </View>
            ) : null}
          </View>
          <ScrollView>
            <View>
              {spinner}
              {renderPastOrders}
            </View>
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
  },
  input: {
    width: Dimensions.get("window").width / 1.09,
    top: 5,
    height: Dimensions.get("window").height / 14,
    borderWidth: 1,
    color: colours.cream,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center"
  },
  filters: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: Dimensions.get("window").width / 14
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentName);
