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
import {connect} from 'react-redux';
import * as colours from "../../styles/colourScheme";
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import ScrollableTabView, {
  DefaultTabBar
} from "react-native-scrollable-tab-view";
import * as actions from '../../store/actions/index'

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
  };

  componentDidMount() {
    this.props.findDrinks("beers", this.props.componentId);
  }
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

// const mapStateToProps = state => {
//   return {
//       barLoading: state.bar.loading,
//       barError: state.bar.error
//   }
// };

const mapDispatchToProps = dispatch => {
  return {
      findDrinks: (category, componentId) => dispatch(actions.findDrinks(category, componentId))
  };
};
export default connect(null, mapDispatchToProps)(ViewDrinks);
