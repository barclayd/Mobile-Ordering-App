import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { setViewDrinks, setViewDrinksSettings } from "../../utility/navigation";
import * as colours from "../../styles/colourScheme";
import { Navigation } from "react-native-navigation";
import IonicIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import beers from "../../assets/beers.jpg";
import logo from "../../assets/taflogo.png";

const theme = {
  Button: {
    raised: true
  },
  SearchBar: {}
};

class ViewMenus extends Component {
  state = {
    search: "",
    categories: ["Drinks Menu", "Food Menu", "Monday Deals", "House Specials 2"]
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "menuButton") {
      !this.isSideDrawerVisible
        ? (this.isSideDrawerVisible = true)
        : (this.isSideDrawerVisible = false);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
    if (buttonId === "profileButton") {
      !this.isSideDrawerVisible
        ? (this.isSideDrawerVisible = true)
        : (this.isSideDrawerVisible = false);
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          right: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
  }

  navigateToViewDrinks = () => {
    Promise.all([
      IonicIcon.getImageSource(
        Platform.OS === "android" ? "md-menu" : "ios-menu",
        30
      ),
      IonicIcon.getImageSource(
        Platform.OS === "android" ? "md-person" : "ios-person",
        30
      ),
      Icon.getImageSource(
        Platform.OS === "android" ? "md-person" : "shopping-basket",
        20
      )
    ]).then(sources => {
      setViewDrinksSettings(sources[2]);
      setViewDrinks(this.props.componentId, "View Drinks");
    });
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.logoHeader}>
          <Image style={styles.logo} resizeMode={'contain'} source={logo} />
        </View>
        <FlatList
        horizontal
        ItemSeparatorComponent={() => <View style={{width: 5}}/>}
        data={this.state.categories}
        renderItem={({ item: rowData }) => {
          return (
            <TouchableOpacity key={rowData} onPress={() => this.navigateToViewDrinks()}>
              <Card title={null} style={styles.card}>
                  <Image
                    style={styles.image}
                    // resizeMode="cover"
                    source={beers}
                  />
                  <Text style={styles.name}>{rowData}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoHeader: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  logo: {
    height: Dimensions.get("window").height/4,
    width: Dimensions.get("window").width/1.1,

  },
  image:{
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 4
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ViewMenus;
