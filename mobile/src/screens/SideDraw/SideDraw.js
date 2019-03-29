import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform, AsyncStorage
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconFa from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";
import * as colours from "../../styles/colourScheme";
import {
  setDefaultSettings,
  setWelcomePageRoot,
  setViewPastOrders,
  setViewPastOrdersSettings,
  setOrderStatus,
    setSwitchBars,
  popToRoot
} from "../../utility/navigation";
import * as actions from "../../store/actions/index";
import { Navigation } from "react-native-navigation";

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    pastOrders: [],
    accountName: 'Your Account'
  };

  async componentDidMount() {
      this.setState({
        accountName: await this.getAccountName(),
        userId: await this.getUserId(),
        orderId: await this.getOrderId()
      });
  }

    async componentDidAppear() {
        this.setState({
            accountName: await this.getAccountName(),
            userId: await this.getUserId(),
            orderId: await this.getOrderId()
        });
    }

  logoutHandler = async () => {
    this.props.onLogout();
    setDefaultSettings();
    await setWelcomePageRoot();
  };

  redirectMenus = async () => {
    await popToRoot("ViewMenus");
  };

  previousOrders = async () => {
    setViewPastOrdersSettings();
    setViewPastOrders(this.props.componentId, "ViewMenus");
  };

  orderStatus = async () => {
    await setOrderStatus(null, 124);
  };

  switchBar = async () => {
    await setSwitchBars(null);
  };

  getAccountName = async () => {
      return await AsyncStorage.getItem("name");
  };

  getUserId = async () => {
    return await AsyncStorage.getItem("userId");
  };

  getOrderId = async () => {
    return await AsyncStorage.getItem("orderId");
  };

  render() {
    let menuOptions =
        <>
          <View style={[styles.drawItem, styles.header]}>
            <Avatar
                rounded
                source={{
                  uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                }}
            />
            <Text style={styles.text}>{this.state.accountName}</Text>
          </View>
          <TouchableOpacity onPress={() => this.logoutHandler()}>
            <View style={styles.drawItem}>
              <Icon
                  size={30}
                  color="#fff"
                  name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
                  style={styles.drawItemIcon}
              />
              <Text style={styles.text}>Sign Out</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.redirectMenus()}>
            <View style={styles.drawItem}>
              <Icon
                  size={30}
                  color="#fff"
                  name={Platform.OS === "android" ? "md-paper" : "ios-paper"}
                  style={styles.drawItemIcon}
              />
              <Text style={styles.text}>Menus</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.previousOrders()}>
            <View style={styles.drawItem}>
              <Icon
                  size={30}
                  color="#fff"
                  name={Platform.OS === "android" ? "md-log-out" : "ios-wine"}
                  style={styles.drawItemIcon}
              />
              <Text style={styles.text}>Previous Orders</Text>
            </View>
          </TouchableOpacity>

          {this.state.orderId ?
              <TouchableOpacity onPress={() => this.orderStatus()}>
                <View style={styles.drawItem}>
                  <Icon
                      size={30}
                      color="#fff"
                      name={
                        Platform.OS === "android"
                            ? "md-log-out"
                            : "md-information-circle-outline"
                      }
                      style={styles.drawItemIcon}
                  />
                  <Text style={styles.text}>Active Order</Text>
                </View>
              </TouchableOpacity>
          : null}



          <TouchableOpacity onPress={() => this.switchBar()}>
            <View style={styles.drawItem}>
              <IconFa
                  size={30}
                  color="#fff"
                  name={
                    Platform.OS === "android"
                        ? "exchange"
                        : "exchange"
                  }
                  style={styles.drawItemIcon}
              />
              <Text style={styles.text}>Switch Bar</Text>
            </View>
          </TouchableOpacity>
        </>;

    if (!this.getUserId()) {
      menuOptions =
          <>
            <View style={[styles.drawItem, styles.header]}>
              <Avatar
                  rounded
                  source={{
                    uri:
                        "https://i.ibb.co/ChW88Bc/rsz-fb.jpg"
                  }}
              />
              <Text style={styles.text}>Create an Account</Text>
            </View>
            <TouchableOpacity onPress={() => this.logoutHandler()}>
              <View style={styles.drawItem}>
                <Icon
                    size={30}
                    color="#fff"
                    name={Platform.OS === "android" ? "md-log-out" : "ios-log-in"}
                    style={styles.drawItemIcon}
                />
                <Text style={[styles.text]}>Sign in </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.redirectMenus()}>
              <View style={styles.drawItem}>
                <Icon
                    size={30}
                    color="#fff"
                    name={Platform.OS === "android" ? "md-paper" : "ios-paper"}
                    style={styles.drawItemIcon}
                />
                <Text style={styles.text}>Menus</Text>
              </View>
            </TouchableOpacity>

            {this.state.orderId ?
                <TouchableOpacity onPress={() => this.orderStatus()}>
                  <View style={styles.drawItem}>
                    <Icon
                        size={30}
                        color="#fff"
                        name={
                          Platform.OS === "android"
                              ? "md-log-out"
                              : "md-information-circle-outline"
                        }
                        style={styles.drawItemIcon}
                    />
                    <Text style={styles.text}>Active Order</Text>
                  </View>
                </TouchableOpacity>
                : null}

            <TouchableOpacity onPress={() => this.switchBar()}>
              <View style={styles.drawItem}>
                <IconFa
                    size={30}
                    color="#fff"
                    name={
                      Platform.OS === "android"
                          ? "exchange"
                          : "exchange"
                    }
                    style={styles.drawItemIcon}
                />
                <Text style={styles.text}>Switch Bar</Text>
              </View>
            </TouchableOpacity>
          </>
    }


    return (
      <View
        style={[styles.container, {width: Dimensions.get("window").width * 0.95}]}>
        {menuOptions}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: colours.cream,
    borderBottomWidth: 2,
    borderBottomColor: colours.cream,
    padding: 20,
    marginTop: 20
  },
  container: {
    paddingTop: 30,
    backgroundColor: colours.midnightBlack,
    color: colours.cream,
    flex: 1
  },
  drawItem: {
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20
  },
  text: {
    color: colours.cream,
    fontSize: 16,
    width: "80%"
  },
  drawItemIcon: {
    marginRight: 30
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(SideDrawer);
