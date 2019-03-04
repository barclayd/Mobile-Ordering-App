import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/index";
import {Card} from "react-native-elements";
import OverlayComponent from "../../../components/UI/Backgrounds/Overlay/OverlayComponent";

class TabScreen2 extends Component {
  state = {
    isVisible: false,
  };

  openOverlay = () => {
    this.setState({
      isVisible: true
    });
  };

  onBackdropPress = () => {
    this.setState({
      isVisible: false
    });
  };


  render() {
    console.log(this.props.category);
    return (
      <View>
        {this.props.drinks.length > 0 ? this.props.drinks.map((u, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => this.openOverlay()}>
              <Card>
                <View style={styles.rowContainer}>
                  <View style={styles.leftContainer}>
                    <Text style={styles.name}>{u.name}</Text>
                  </View>
                  <Text style={styles.price}>£{u.price}</Text>
                </View>
                <Text style={styles.description}>{u.nutritionInfo}</Text>
              </Card>
            </TouchableOpacity>
          );
        }):null}
        <OverlayComponent
          isVisible={this.state.isVisible}
          onBackdropPress={this.onBackdropPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slidingTabs: {
    flex: 1,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 16,
    backgroundColor: "black"
  },
  background: {
    backgroundColor: "white",
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingBottom: "1%"
    // backgroundColor: 'green'
  },
  price: {
    fontWeight: "600",
    fontSize: 16
  },
  name: {
    fontWeight: "600",
    fontSize: 16
  },
  description: {
    fontWeight: "400"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    paddingTop: 10,
    paddingLeft: Dimensions.get("window").width / 14,
    fontSize: 32
  },
  contentContainer: {}
});


const mapStateToProps = state => {
  return {
    error: state.drink.error,
    loading: state.drink.loading,
    data: state.drink.drinks,
    saved: state.drink.saved
  };
};
const mapDispatchToProps = dispatch => {
  return {
    findDrinks: (category, componentId) =>
      dispatch(actions.findDrinks(category, componentId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabScreen2);
