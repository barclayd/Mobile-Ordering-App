import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-elements";
import OverlayComponent from "../../../components/UI/Overlays/AddDrinks";
import * as colours from "../../../styles/colourScheme";
import { connect } from "react-redux";
import { SimpleStepper } from "react-native-simple-stepper";
import * as actions from "../../../store/actions/index";

class TabbedCategories extends Component {
  state = {
    isVisible: false,
    drinkSelected: {},
    trashCanVisible: false,
    itemSelected: "",
    quantity: 0,
    value: 1,
    basketAction: false
  };

  openOverlay = i => {
    const drinkSelected = this.props.drinks[i];
    basketDrinks = [];
    this.props.basket.map(drinks => {
      basketDrinks.push(drinks.name)
    })
    if (basketDrinks.includes(drinkSelected.name)){
      console.log("drink select exists in basket")
      this.setState({
        basketAction: true
      })
    } else {
      this.setState({
        basketAction: false
      })
    }
  this.setState({
    isVisible: true,
    drinkSelected: drinkSelected,
  });
  }

    
    

  onBackdropPress = () => {
    this.setState({
      isVisible: false,
      cardColour: ""
    });
  };

  setModalVisible = () => {
    this.setState({
      isVisible: false
    });
  };

  basketItems = name => {
    let quantity = 0;
    this.props.basket.map(drink => {
      if (drink.name === name) quantity = drink.quantity;
    });
    return quantity;
  };

  render() {
    return (
      <View>
        {this.props.drinks.length > 0
          ? this.props.drinks.map((u, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.openOverlay(i)}
                >
                  <Card>
                    <View style={styles.rowContainer}>
                      <View style={styles.leftContainer}>
                        <Text style={styles.name}>{u.name}</Text>
                      </View>

                      <View>
                        <Text style={styles.price}>£{u.price}</Text>
                      </View>
                    </View>

                    <View style={styles.rowContainer}>
                      <View style={styles.leftContainer}>
                      <Text style={styles.description}>{u.nutritionInfo}</Text>
                      </View>
                      {this.basketItems(u.name) > 0 ? (
                        <Text style={styles.quantity}>
                          x{this.basketItems(u.name)} Pint{" "}
                        </Text>
                      ) : null}

                    </View>



                    {/* <View style={styles.endContainer}>

                      {this.state.trashCanVisible &&
                      this.props.drinks[i].name === this.state.itemSelected ? (
                        <View style={styles.rightContainer}>
                          <Icon
                            name="trash-o"
                            style={styles.trash}
                            size={30}
                            color={colours.orange}
                          />
                          <SimpleStepper
                            value={this.basketItems(u.name)}
                            imageHeight={10}
                            imageWidth={20}
                            tintColor={colours.orange}
                            valueChanged={value => this.valueChanged(value)}
                          />
                        </View>
                      ) : null}
                    </View> */}
                  </Card>
                </TouchableOpacity>
              );
            })
          : null}
        <OverlayComponent
          modalVisible={this.setModalVisible}
          drinkDetails={this.state.drinkSelected}
          isVisible={this.state.isVisible}
          onBackdropPress={this.onBackdropPress}
          basketAction={this.state.basketAction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width / 2.3
  },
  item: {
    width: Dimensions.get("window").width / 2
  },
  trash: {
    marginRight: 5
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
    left: 0,
    right: 0,
    top: 0
  },
  price: {
    fontWeight: "600",
    fontSize: 16
  },
  name: {
    fontWeight: "600",
    fontSize: 16
  },
  description: {
    fontWeight: "400",
    marginTop: 3
  },
  quantity: {
    fontWeight: "600",
    marginTop: 5,
    color: colours.orange
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  endContainer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  title: {
    paddingTop: 10,
    paddingLeft: Dimensions.get("window").width / 14,
    fontSize: 32
  },
  contentContainer: {}
});

const mapStateToProps = state => {
  return {
    basket: state.basket.basket,
    basketCategories: state.basket.categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateBasket: (drink, basketAction) =>
      dispatch(actions.updateBasket(drink, basketAction))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedCategories);
