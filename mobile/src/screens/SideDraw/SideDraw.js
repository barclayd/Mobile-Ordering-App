import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Scrollview
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as colours from "../../styles/colourScheme";
import {
  setDefaultSettings,
  setWelcomePageRoot
} from "../../utility/navigation";
import * as actions from "../../store/actions/index";

class SideDrawer extends Component {

    state = {
        pastOrders: []
    };

  logoutHandler = () => {
    this.props.onLogout();
    setDefaultSettings();
    setWelcomePageRoot();
  };

  componentDidMount(){
      this.props.findUserOrders();
  }

  componentWillReceiveProps(nextProps) {
        if (!nextProps.loading) {
          this.setState({
            pastOrders: nextProps.pastOrders,
          });
    }
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

        <View style={[styles.drawItem, styles.header]}>
          <Text style={styles.text}>Past Orders</Text>
        </View>

        {/* <Scrollview>   */}
        <TouchableOpacity>
          <View style={styles.drawItem}>
            <Text style={styles.text}>Text</Text>
          </View>
        </TouchableOpacity>
        {/* </Scrollview> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    borderBottomColor: colours.cream
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
    padding: 20,
    marginTop: 20
  },
  text: {
    color: colours.cream,
    fontSize: 24,
    width: "80%"
  },
  drawItemIcon: {
    marginRight: 30
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout()),
    findUserOrders: () => dispatch(actions.orderHistory())
  };
};

const mapStateToProps = state => {
  return {
    pastOrders: state.pastOrders
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideDrawer);
