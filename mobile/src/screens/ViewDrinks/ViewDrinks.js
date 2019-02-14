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
import barImage from "../../assets/barConfetti.jpg";
var ScrollableTabView = require("react-native-scrollable-tab-view");
import TabScreen1 from './TabScreens/TabScreen1';
import TabScreen2 from './TabScreens/TabScreen2';

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

  openOverlay = () => {
    //
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.background}>
          <ThemeProvider theme={theme}>
            <View style={styles.slidingTabs}>
              <ScrollableTabView>
                <TabScreen1 tabLabel="Spirits" />
                <TabScreen2 tabLabel="Beers" />
              </ScrollableTabView>
            </View>
            {this.state.categories.map((u, i) => {
              return (
                <TouchableOpacity onPress={() => this.openOverlay()}>
                  <Card>
                    <View key={i} style={styles.user}>
                      <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ barImage }}
                      />
                      <View style={styles.rowContainer}>
                        <View style={styles.leftContainer}>
                          <Text style={styles.name}>{u.name}</Text>
                        </View>
                        <Text style={styles.price}>{u.price}</Text>
                      </View>

                      <Text style={styles.description}>{u.description}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              );
            })}
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

export default ViewDrinks;
