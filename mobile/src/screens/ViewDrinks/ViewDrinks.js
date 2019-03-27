import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";
import * as actions from "../../store/actions/index";
import * as colours from "../../styles/colourScheme"
import TabbedCategories from "./TabbedCategories/TabbedCategories";
import Checkout from '../../components/HOC/Checkout/Checkout';
import {Navigation} from "react-native-navigation";
import {setViewBasket} from "../../utility/navigation";

const screenHeight = Dimensions.get('window').height;

class ViewDrinks extends Component {

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  state = {
    search: "",
    drinks: [],
    categories: [],
    drinksApi: false,
  };

  componentDidMount() {
    this.props.onFetchDrinkCategories();
    this.props.findAllDrinks();
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        categories: nextProps.drinkCategories,
        drinks: nextProps.drinks
      });
    }
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "basketButton") {
      setViewBasket(this.props.componentId, "Drinks", true);
    }
  }

  getDrinksByCategory = (id) => {
    const categoryName = this.state.categories[id];
    return this.state.drinks.filter(drink => drink.category === categoryName);
  };

  render() {
    return (
        <Checkout componentId={this.props.componentId}>
          <View style={styles.background}>
            <View style={{flex: .85}}>
              {this.state.categories.length > 0 ? (
                  <ScrollableTabView
                      style={{ marginTop: 20 }}
                      initialPage={0}
                      tabBarUnderlineStyle={{backgroundColor: colours.orange}}
                      tabBarActiveTextColor={colours.orange}
                      tabBarTextStyle={{fontWeight: "600",fontSize: 16}}
                      renderTabBar={() => <ScrollableTabBar />}
                  >
                    {this.state.categories.length > 0
                        ? this.state.categories.map((category, index) => {
                          return (
                              <ScrollView tabLabel={category} key={index}>
                                <TabbedCategories
                                    key={category}
                                    category={category}
                                    drinks={this.getDrinksByCategory(index)}
                                />
                              </ScrollView>
                          );
                        })
                        : null}

                  </ScrollableTabView>
              ) : <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color={colours.orange} />
              </View>}

            </View>
            <View
                style={[{flex: 0.1, backgroundColor: 'transparent' }]}>
            </View>
          </View>
        </Checkout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
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
    height: screenHeight/2,
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
