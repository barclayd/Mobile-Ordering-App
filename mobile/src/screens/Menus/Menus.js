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
import * as colours from "../../styles/colourScheme";
import {Navigation} from "react-native-navigation";
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Button, ThemeProvider, SearchBar, Card } from "react-native-elements";
import barImage from "../../assets/barConfetti.jpg";

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

  navigateToMenu = () => {
    Promise.all([
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-menu" : "ios-menu"), 30),
        IonicIcon.getImageSource((Platform.OS === 'android' ? "md-person" : "ios-person"), 30)
    ])
        .then(sources => {
            Navigation.setDefaultOptions({
                sideMenu: {
                    left: {
                        enabled: false,
                        visible: false
                    },
                    right: {
                        visible: false,
                        enabled: false
                    }
                },
                statusBar: {
                    hideWithTopBar: false,
                },
                topBar: {
                    leftButtons: [
                        {
                            id: 'menuButton',
                            icon: sources[0],
                            color: colours.white
                        }
                    ],
                    barStyle: 'black',
                    rightButtons: [
                        {
                            id: 'profileButton',
                            icon: sources[1],
                            color: colours.white
                        }
                    ]
                }
            });
    Navigation.setStackRoot(this.props.componentId, {
        component: {
            name: 'drinks-app.ViewDrinksScreen',
            options: {
                animations: {
                    setStackRoot: {
                        enabled: true
                    }
                },
                topBar: {
                    visible: true,
                    title: {
                        text: 'The Taff'
                    },
                    leftButtons: [
                        {
                            id: 'menuButton',
                            icon: sources[0],
                            color: colours.white
                        }
                    ],
                }
            }
        }
    })

        })
};

  render() {
    const { search } = this.state;

    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.background}>
          <ThemeProvider theme={theme}>
            {this.state.categories.map((u, i) => {
              return (
                <TouchableOpacity onPress={() => this.navigateToMenu()}>
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

export default ViewMenus;
