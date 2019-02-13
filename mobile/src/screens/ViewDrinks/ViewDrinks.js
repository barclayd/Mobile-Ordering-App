import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as colours from "../../styles/colourScheme";
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";

const theme = {
  Button: {
    raised: true
  },
  SearchBar: {}
};

class ViewDrinks extends Component {
  state = {
    search: "",

    categories: ["Beers", "Spirits", "House Specials"]
  };

  updateSearch = search => {
    // code to search through mongo DB
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.background}>
        <Text style={styles.title}>Drinks Menu</Text>
        <ThemeProvider theme={theme}>
          <SearchBar
            onChangeText={this.updateSearch}
            value={search}
            round={true}
            inputStyle={{ backgroundColor: "transparent" }}
            containerStyle={{ backgroundColor: "transparent" }}
            placeholder={"Search"}
            title="Hey!"
          />

          <Text>{this.state.search}</Text>

          <Card title="CARD WITH DIVIDER">
            {this.state.categories.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  {/* <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  /> */}
                  <Text style={styles.name}>{u}</Text>
                </View>
              );
            })}
          </Card>
        </ThemeProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colours.cream,
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  },
  title: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 32
  }
});

export default ViewDrinks;
