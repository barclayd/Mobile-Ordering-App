import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput
} from "react-native";
import validate from "../../utility/validation";
import Icon from "react-native-vector-icons/FontAwesome";
import { Navigation } from "react-native-navigation";
import * as colours from "./../../styles/colourScheme";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { Card, ListItem } from "react-native-elements";
import SimpleCrypto from "simple-crypto-js";
// import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from "react-native-modal-datetime-picker";
import QRCode from "react-native-qrcode-svg";
import moment from 'moment';

class ViewPastOrders extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  state = {
    pastOrders: [],
    selectedOrder: null,
    showOrderOverlay: false,
    arrayHolder: [],
    dateArrayHolder: [],
    currentDate: new Date(),
    isDateTimePickerVisible: false,
    selectedDate: null,
    dates: {
      value: null
    },
    showFilters: false,
    input: {
      orderId: {
        value: null,
        valid: false,
        validationRules: {
          minLength: 4
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
        arrayHolder: nextProps.pastOrders,
        dateArrayHolder: nextProps.pastOrders
      });
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "arrow-down") {
      this.setState({
        showFilters: !this.state.showFilters
      })
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

  qrCode = () => {
    let qrCode = null;
    const key = "zvBT1lQV1RO9fx6f8";
    const crypto = new SimpleCrypto(key);
    const token = crypto.encrypt(this.state.selectedOrder.collectionId);

    if (this.state.selectedOrder.collectionId) {
      return <QRCode value={token} size={300} />;
    }
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
      const itemData = order.collectionId.toLowerCase();
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

    _handleDatePicked = (date) => {
      // const newDate = moment(new Date(date.toString().substr(0, 16))).format('DD-MM-YYYY');
      console.log("A date has been picked: ", date);
      const newData = this.state.arrayHolder.filter(order => {
      const itemData = moment(new Date(order.date)).format("DD-MM-YYYY")
      const pickerDate = moment(date).format("DD-MM-YYYY");
      return itemData === pickerDate;
      })
      let pickerDate = moment(date).format("DD-MM-YYYY");
      console.log(pickerDate)
      this.setState({
        pastOrders: newData,
        selectedDate: pickerDate
      })
      this._DateTimePicker();
    };

  
  removeDate = () => {
    this.setState({
      selectedDate: null
    })
  }

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

        let individualDrinks = [...new Set(drinksList)];
        individualDrinks.map(drink => {
          const count = drinksList.reduce((n, val) => {
            return n + (val === drink);
          }, 0);
          finalList.push({ name: drink, quantity: count });
        });

        return (
          <TouchableOpacity onPress={() => this.toggleOrderOverlay(i)} key={i}>
            <Card
              key={i}
              title={`#${order.collectionId}`}
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
                  fontWeight: "bold",
                    textAlign: 'center'
                }}
                containerStyle={{ backgroundColor: colours.lightGrey }}
                title={`${order.collectionPoint.bar.name} | ${order.collectionPoint.name}`}
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
                        {new Date(parseInt(order.date)).toDateString()}
                      </Text>
                      {/* spacing */}
                      <Text> </Text>
                      <Text style={styles.subInformationText}>
                        {new Date(parseInt(order.date)).toTimeString().slice(0, 5)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text style={{color: colours.midnightBlack, fontWeight: "bold"}}>Order Status: </Text>
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

                    {this.state.showOrderOverlay &&
                    this.state.selectedOrder._id === order._id ? (
                      <View>
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
          <View >
            {this.state.showFilters ? (
              <View style={[styles.filters, { borderBottomWidth: 1,
                borderBottomColor:
                this.state.pastOrders.length > 0
                  ? colours.cream
                  : colours.warningRed}]}>
                <TextInput
                  placeholder="Filter by Order Id..."
                  value={this.state.input.orderId.value}
                  style={styles.input}
                  placeholderTextColor={colours.white}
                  maxLength={4}
                  autoCorrect={false}
                  selectionColor={colours.orange}
                  onChangeText={val => this.inputUpdateHandler("orderId", val)}
                />
                
                <View style={styles.dateFilter}>
                <TouchableOpacity onPress={() => this._DateTimePicker()}
                style={{flexDirection: "row",justifyContent: "flex-start",}}>
                  <Icon name="calendar" size={22} color={colours.pureWhite}/>
                  <Text style={styles.dateText}>{this.state.selectedDate === null ? null: " "+this.state.selectedDate}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  date={this.state.currentDate}
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._DateTimePicker}
                  mode={'date'}
                  is24Hour={true}
                  maximumDate={new Date()}
                />
                </View>

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
            <View style={{paddingVertical: 5}}>
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
    alignSelf: "center",
      padding: 20
  },
  input: {
    width: Dimensions.get("window").width / 5 *3 ,
    top: 5,
    left: 5,
    height: Dimensions.get("window").height / 14,
    color: colours.cream,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center"
  },
  dateFilter: {
    width: Dimensions.get("window").width /5 *2 ,
    top: 5,
    height: Dimensions.get("window").height / 14,
    
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center"
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: colours.pureWhite,
    textAlign: "center"
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
