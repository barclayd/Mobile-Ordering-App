import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import * as actions from "../../store/actions/index";

import TabScreen2 from "./TabScreens/TabScreen2";

class ViewDrinks extends Component {

  state = {
    search: "",
    drinks: [],
    categories: ['Beers'],
    drinksApi: false
  };

  componentDidMount() {
    // get categories dynamically
    this.props.onFetchDrinkCategories();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!nextProps.loading) {
      this.setState({
        categories: nextProps.drinkCategories,
      });
    }
  }

  getDrinksByCategory = (id) => {
    const categoryName = this.state.categories[id];
    console.log(categoryName);
    this.props.findDrinks(categoryName, this.props.componentId);
  };

  render() {
    console.log(this.state.categories);
    return (
        <View style={styles.background}>
          <ScrollableTabView
              style={{ marginTop: 20 }}
              initialPage={0}
              renderTabBar={() => <DefaultTabBar />}
          >
            {this.state.categories.length > 0 ? this.state.categories.map((category, index)  => {
              return <ScrollView tabLabel={category}>
                <TabScreen2
                    key={category}
                    category={category}
                    drinks={this.getDrinksByCategory(index)}
                    data={this.props.drinks}
                />
              </ScrollView>
            }): null}
          </ScrollableTabView>
        </View>
    )
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

