import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";

import * as colours from "../../styles/colourScheme";
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import TabScreen2 from "./TabScreens/TabScreen2";

const theme = {
  Button: {
    raised: true
  },
  SearchBar: {}
};

class ViewDrinks extends Component {
  state = {
    search: "",
    drinks: [],
    categories: ["beers", "Cocktails", "Soft Drinks"],
    drinksApi: false
  };

  

  // componentWillReceiveProps(nextProps) {
  //   console.log("props received in view drinks as :", nextProps);
  //   if (!nextProps.loading) {
  //     this.setState({
  //       drinks: nextProps.data,
  //       drinksApi: true
  //     });
  //   }
  // }

  // componentDidUpdate() {
  //   console.log("state view drinks", this.state);
  // }

  render() {
    return (
      <View style={styles.background}>
        <ScrollableTabView
          style={{ marginTop: 20 }}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
        >
          {this.state.categories.map(categories => (
            <ScrollView>
              <TabScreen2
                key={categories}
                tabLabel="React"
                category={categories}
              />
            </ScrollView>
          ))}
        </ScrollableTabView>
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
  title: {
    paddingTop: 10,
    paddingLeft: Dimensions.get("window").width / 14,
    fontSize: 32
  }
});

export default ViewDrinks
