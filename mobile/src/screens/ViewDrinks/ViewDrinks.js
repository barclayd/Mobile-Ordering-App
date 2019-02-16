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
import TabScreen1 from "./TabScreens/TabScreen1";
import TabScreen2 from "./TabScreens/TabScreen2";
import TabScreen3 from "./TabScreens/TabScreen3";

const theme = {
  Button: {
    raised: true
  },
  SearchBar: {}
};

class ViewDrinks extends Component {
  state = {
    search: "",
    categories: [
      {
        name: "Fosters - 18+",
        price: "£2.09",
        description: "201 kcal. 5.0%. 2.8 Units"
      },
      {
        name: "Hop House 13 Larger - 18+",
        price: "£3.49",
        description: "201 kcal. 5.0%. 2.8 Units"
      },
      {
        name: "Carling - 18+",
        price: "£2.19",
        description: "201 kcal. 5.0%. 2.8 Units"
      },
      {
        name: "Bud Light+",
        price: "£4.09",
        description: "201 kcal. 5.0%. 2.8 Units"
      },
      {
        name: "San Miguel",
        price: "£4.09",
        description: "201 kcal. 5.0%. 2.8 Units"
      },
      {
        name: "Kronenburg",
        price: "£4.09",
        description: "201 kcal. 5.0%. 2.8 Units"
      }
    ]
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.background}>
          <ThemeProvider theme={theme}>
            <ScrollableTabView
              style={{ marginTop: 20 }}
              initialPage={0}
              renderTabBar={() => <DefaultTabBar />}
            >
              <TabScreen2 tabLabel="Beers" />
              <TabScreen1 tabLabel="Spirits" />
              <TabScreen3 tabLabel="Wines" />
            </ScrollableTabView>
          </ThemeProvider>
        </View>
      </ScrollView>
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

export default ViewDrinks;
