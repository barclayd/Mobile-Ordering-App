import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform, Animated
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import { setViewBasket, setViewBasketSettings } from "../../utility/navigation";
import IonicIcon from "react-native-vector-icons/Ionicons";
import * as actions from "../../store/actions/index";
import { Navigation } from "react-native-navigation";
import SlidingUpPanel from 'rn-sliding-up-panel'
import TabScreen2 from "./TabScreens/TabScreen2";
import * as colours from '../../styles/colourScheme';
import Checkout from '../Checkout/Checkout';
import {Button, Text} from "react-native";

const screenHeight = Dimensions.get('window').height;

class ViewDrinks extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  state = {
    search: "",
    drinks: [],
    categories: [],
    drinksApi: false
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "profileButton") {
      Promise.all([
        IonicIcon.getImageSource(
          Platform.OS === "android" ? "md-menu" : "ios-menu",
          30
        ),
        IonicIcon.getImageSource(
          Platform.OS === "android" ? "md-person" : "ios-person",
          30
        )
      ]).then(sources => {
        setViewBasketSettings(sources[1]);
        setViewBasket(this.props.componentId, "Checkout");
      });
    }
  }
  componentDidMount() {
    // get categories dynamically
    this.props.onFetchDrinkCategories();
    this.props.findAllDrinks();
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!nextProps.loading) {
      // sort drinks into categories
      this.setState({
        categories: nextProps.drinkCategories,
        drinks: nextProps.drinks
      });
    }
  }

  getDrinksByCategory = (id) => {
    const categoryName = this.state.categories[id];
    console.log(categoryName);
    return this.state.drinks.filter(drink => drink.category === categoryName);
  };

  render() {
    console.log(this.state.categories);
    return (
      <View style={styles.background}>
        <ScrollView>
        {this.state.categories.length > 0 ? (
          <ScrollableTabView
            style={{ marginTop: 20 }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            {this.state.categories.length > 0
              ? this.state.categories.map((category, index) => {
                  return (
                    <ScrollView tabLabel={category} key={index}>
                      <TabScreen2
                        key={index}
                        category={category}
                        drinks={this.getDrinksByCategory(index)}
                      />
                    </ScrollView>
                  );
                })
              : null}
          </ScrollableTabView>
        ) : null}
        </ScrollView>
        <View
            style={[{position: 'absolute', left: 0, right: 0, zIndex: 10, height: screenHeight, bottom: 0 }]}>
          <Checkout />
        </View>
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
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = state => {
  return {
    drinkCategories: state.drink.categories,
    drinks: state.drink.drinks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchDrinkCategories: () => dispatch(actions.findDrinkCategories()),
    findDrinks: (category, componentId) =>
        dispatch(actions.findDrinks(category, componentId)),
    findAllDrinks: (componentId) => dispatch(actions.findDrinks(null, componentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewDrinks);

