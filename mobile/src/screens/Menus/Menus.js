import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform, AsyncStorage
} from "react-native";
import {connect} from 'react-redux';
import {setViewDrinksSettings, setViewDrinks} from "../../utility/navigation";
import * as colours from "../../styles/colourScheme";
import * as fontWeight from "../../styles/fontStyles";
import * as actions from '../../store/actions/index';
import { Navigation } from "react-native-navigation";
import IonicIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
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

  componentDidMount() {
    if (!this.props.menus.length > 0) {
      this.props.loadBar(this.props.barCode, this.props.componentId, true);
    }
  }

  componentDidAppear() {
    if (this.props.currentBar.name) {
      Navigation.mergeOptions(this.props.componentId, {
        topBar: {
          title: {
            text: this.props.currentBar.name
          }
        }
      });
    }
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

  navigateToViewDrinks = (menuId) => {
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
      setViewDrinks(this.props.componentId, "View Drinks", menuId);
    });
  };

  getBarName = async () => {
    return await AsyncStorage.getItem("barName");
  };

  render() {
    console.log(this.props);
    return (
      <Checkout componentId={this.props.componentId}>
      <View style={styles.background}>
        <View style={{flex: .85}}>
        <View style={styles.logoHeader}>
          {this.props.currentBar.logo ? <Image style={styles.logo} resizeMode={"contain"} source={{uri: this.props.currentBar.logo}}/> : null}
        </View>
          <View style={styles.view}>
            <FlatList
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
              data={this.props.menus}
              renderItem={({ item: rowData }) => {
                console.log(rowData);
                return (
                  <TouchableOpacity
                    key={rowData}
                    onPress={() => this.navigateToViewDrinks(rowData._id)}
                  >
                      <Image
                        style={styles.image}
                        source={{uri: rowData.image}}
                      />
                      <Text style={styles.menuName}>{rowData.name}</Text>
                      <Text style={styles.menuDescription}>{rowData.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
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
    height: (Dimensions.get("window").height * 3),
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
  menuDescription: {
    textAlign: "center",
    color: colours.midnightBlack,
    fontSize: 16
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
    width: 'auto',
    height: Dimensions.get("window").height / 4,
    marginTop: 20,
  },
  card: {
    height: Dimensions.get("window").height / 2.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colours.cream
  }
});

const mapDispatchToProps = dispatch => {
  return {
    loadBar: (barCode, componentId, autoLogin) => dispatch(actions.findBar(barCode, componentId, autoLogin)),
  }
};

const mapStateToProps = state => {
  return {
    menus: state.bar.menus,
    currentBar: state.bar,
    loading: state.bar.loading
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMenus);
