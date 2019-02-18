import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import {setViewDrinks, setViewDrinksSettings} from '../../utility/navigation';
import * as colours from "../../styles/colourScheme";
import {Navigation} from "react-native-navigation";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import beers from "../../assets/beers.jpg";

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
        (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: this.isSideDrawerVisible,
                }
            }
        });
    }
    if (buttonId === "profileButton") {
        (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                right: {
                    visible: this.isSideDrawerVisible,
                }
            }
        });
    }
}

navigateToViewDrinks = () => {
    Promise.all([
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30),
        Icon.getImageSource((Platform.OS === 'android' ? "md-person" : "shopping-basket"), 20)
    ])
        .then(sources => {
            setViewDrinksSettings(sources[2]);
            setViewDrinks(this.props.componentId, "View Drinks");
        });
}

  render() {
    const { search } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.background}>
          <ThemeProvider theme={theme}>
            {this.state.categories.map((u, i) => {
              return (
                <TouchableOpacity onPress={() => this.navigateToViewDrinks()}>
                <Card title={u}>
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={beers}
                    />
                    {/* <Text style={styles.name}>{u}</Text> */}
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
  background: {
    backgroundColor: 'white',
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
  contentContainer: {
  },
  image: {
    flex: 1,
    height: Dimensions.get("window").height / 8,
    width: Dimensions.get("window").width / 2,
  }
});

export default ViewMenus;

