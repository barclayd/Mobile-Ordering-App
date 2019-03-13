import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Scrollview,
  ActivityIndicator,
} from "react-native";
// import IonicIcon from "react-native-vector-icons/Ionicons";
// import IonicIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import * as colours from "../../styles/colourScheme";
import {
  setDefaultSettings,
  setWelcomePageRoot,
  setViewPastOrders,
  setViewPastOrdersSettings,
  setOrderStatus
} from "../../utility/navigation";
import * as actions from "../../store/actions/index";
import {Navigation} from "react-native-navigation";

class SideDrawer extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  state = {
    pastOrders: []
  };

  logoutHandler = () => {
    this.props.onLogout();
    setDefaultSettings();
    setWelcomePageRoot();
  };

  previousOrders = async () => {
    // Promise.all([
    //     Icon.getImageSource(
    //         Platform.OS === "android" ? "shopping-basket" : "shopping-basket",
    //         20
    //       ),
    //       Icon.getImageSource(
    //         Platform.OS === "android" ? "shopping-basket" : "shopping-basket",
    //         20)
    // ].then(sources => {
    setViewPastOrdersSettings();
    setViewPastOrders(this.props.componentId,"ViewMenus");
    // }))
}

  componentDidUpdate() {
    console.log(this.state);
  }

  orderStatus = async () => {
    await setOrderStatus(this.props.componentId, 128);
  };

//   renderContent() {
//     {this.state.pastOrders.length > 0
//         ? this.state.pastOrders.map((pastOrder, i) => {
//             return (
//           <View key={i}>
//             <TouchableOpacity>
//               <View style={styles.drawItem}>
//                 <Text style={styles.text}>{pastOrder._id}</Text>
//               </View>
//             </TouchableOpacity>;
//           </View>
//             );
//       })
//         : null
//   }

  renderContent = () => {
    {this.state.pastOrders.length > 0 ?
    this.state.pastOrders.map(order => {
        return (
            <Text style={styles.text}>i
            </Text>
        );
    }) : null}
            
                // <ActivityIndicator size="large" color={colours.orange} /
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            width: Dimensions.get("window").width * 0.95
          }
        ]}
      >
        <View style={[styles.drawItem, styles.header]}>
          <Text style={styles.text}>Account</Text>
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

        <TouchableOpacity onPress={() => this.orderStatus()}>
          <View style={styles.drawItem}>
            <Icon
              size={30}
              color="#fff"
              name={Platform.OS === "android" ? "md-log-out" : "md-information-circle-outline"}
              style={styles.drawItemIcon}
            />
            <Text style={styles.text}>Order Status</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity>
          <View style={styles.drawItem}>
            <Icon
              size={30}
              color="#fff"
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              style={styles.drawItemIcon}
            />
            <Text style={styles.text}>Notifications</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.drawItem}>
            <Icon
              size={30}
              color="#fff"
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              style={styles.drawItemIcon}
            />
            <Text style={styles.text}>Location Services</Text>
          </View> */}
        {/* </TouchableOpacity> */}
        {/* <View style={[styles.drawItem, styles.header]}>
          <Text style={styles.text}>Past Orders</Text>
        </View> */}

        {/* <View style={styles.drawItem}>{() => this.renderContent()}</View> */}
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
    marginTop: 20,
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

export default connect(
  null,
  mapDispatchToProps
)(SideDrawer);
