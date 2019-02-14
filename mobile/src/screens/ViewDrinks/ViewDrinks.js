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

const theme = {
  Button: {
    raised: true
  },
  SearchBar: {}
};

class ViewDrinks extends Component {
  state = {
    search: "",
    categories: ["Fosters", "Fosters","Fosters","Fosters","Fosters"]
  };

  openOverlay = () => {
    //
  }

  render() {

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.background}>
          <ThemeProvider theme={theme}>
            {this.state.categories.map((u, i) => {
              return (
                <TouchableOpacity onPress={() => this.openOverlay()}>
                <Card title={u}>
                  <View key={i} style={styles.user}>
                    <Image
                      style={styles.image}
                      resizeMode="cover"
                      source={{ barImage }}
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
  }
});

export default ViewDrinks;
