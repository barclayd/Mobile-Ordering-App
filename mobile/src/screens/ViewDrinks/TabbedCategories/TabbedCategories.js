import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {Card} from "react-native-elements";
import OverlayComponent from "../../../components/UI/Backgrounds/Overlay/OverlayComponent";

class TabbedCategories extends Component {
  state = {
    isVisible: false,
    drinkSelected: {}
  };

  openOverlay = (i) => {
    const drinkSelected = this.props.data[i];
    console.log("drinkSelected",drinkSelected);
    this.setState({
      isVisible: true,
      drinkSelected: drinkSelected
    });
  };

  onBackdropPress = () => {
    this.setState({
      isVisible: false
    });
  };

  setModalVisible = () => {
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
            <TouchableOpacity key={i} onPress={() => this.openOverlay(i)}>
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
          modalVisible={this.setModalVisible}
          drinkDetails={this.state.drinkSelected}
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

export default TabbedCategories;
