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
import {setViewDrinksSettings, setViewDrinks} from "../../utility/navigation";
import * as colours from "../../styles/colourScheme";
import * as fontWeight from "../../styles/fontStyles";
import { Navigation } from "react-native-navigation";
import IonicIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import beers from "../../assets/beers.jpg";
import logo from "../../assets/taflogo.png";
import Checkout from "../../components/HOC/Checkout/Checkout";

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
        Platform.OS === "android" ? "shopping-basket" : "shopping-basket",
        20
      )
    ]).then(sources => {
      setViewDrinksSettings(sources[2]);
      setViewDrinks(this.props.componentId, "View Drinks");


    });
  };

  render() {
    return (
      <Checkout componentId={this.props.componentId}>
      <View style={styles.background}>
        <View style={{flex: .85}}>
        <View style={styles.logoHeader}>
          <Image style={styles.logo} resizeMode={"contain"} source={logo} />
        </View>
          <View style={styles.view}>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              data={this.state.categories}
              renderItem={({ item: rowData }) => {
                return (
                  <TouchableOpacity
                    key={rowData}
                    onPress={() => this.navigateToViewDrinks()}
                  >
                      <Image
                        style={styles.image}
                        source={beers}
                      />
                      <Text style={styles.menuName}>{rowData}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>
        <View
            style={[{flex: 0.15, backgroundColor: colours.transparent }]}>
        </View>
      </View>
        </Checkout>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height: (Dimensions.get("window").height * 3) / 4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5
  },
  menuName: {
    textAlign: "center",
    fontWeight: fontWeight.bold,
    color: colours.midnightBlack,
    fontSize: 32
  },
  logoHeader: {
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
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
    height: Dimensions.get("window").height / 4,
    width: Dimensions.get("window").width / 1.1
  },
  image: {
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 3,
    marginTop: 20,
  },
  card: {
    height: Dimensions.get("window").height / 2.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.cream
  }
});

export default ViewMenus;
