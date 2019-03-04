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
import { connect } from "react-redux";
import * as colours from "../../styles/colourScheme";
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import * as actions from "../../store/actions/index";

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
    categories: ["beers", "Spirits", "Soft Drinks"],
    drinksApi: false
  };

  componentDidMount() {
    this.props.findDrinks("beers", this.props.componentId);
  }

  componentDidUpdate() {
    console.log("state view drinks", this.state);
  }

  componentWillReceiveProps(nextProps) {
    console.log("props received in TabScreen2 as :", nextProps);
    if (!nextProps.loading) {
      this.setState({
        drinks: nextProps.data,
        drinksApi: true
      })
    }
  }

  render() {
    return (
      <View style={styles.background}>
        <ScrollableTabView
          style={{ marginTop: 20 }}
          initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
        >
          {this.state.categories.map(categories => (
            <ScrollView tabLabel={categories}>
              <TabScreen2
                onRef={ref => (this.TabScreen2 = ref)}
                key={categories}
                category={categories}
                drinks={this.state.drinks}
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

const mapStateToProps = state => {
  return {
    error: state.drink.error,
    loading: state.drink.loading,
    data: state.drink.drinks,
    saved: state.drink.saved
  };
};
const mapDispatchToProps = dispatch => {
  return {
    findDrinks: (category, componentId) =>
      dispatch(actions.findDrinks(category, componentId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDrinks);


