import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Overlay } from "react-native-elements";
import { SimpleStepper } from "react-native-simple-stepper";
import * as colours from "../../../styles/colourScheme";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

class AddDrinks extends Component {

  state = {
    value: 1,
    price: null,
    orderedDrinks: [],
    verb: false
  };

  componentWillReceiveProps(nextProps){
    if (!nextProps.loading){
      if (nextProps.drinkDetails){
        // if item exists in the basket -> show quantity of item in basket.
        let drinksList = [];
        this.props.basket.map(drinks => {
          drinksList.push(drinks.name)
        })
        if (drinksList.includes(nextProps.drinkDetails.name)){
            nextProps.basket.map(drink => {
              if (drink.name == nextProps.drinkDetails.name){
                console.log(drink.name,"has : ",drink.quantity, "quantity");
                this.setState({
                  value: drink.quantity
                })
              }
            })
          }
        }
      }
    }

  valueChanged = value => {
    if (value === 0) {
      return;
    }

    const nextValue = Number(value.toFixed(2));
    let initialPrice = Number(this.props.drinkDetails.price) * nextValue;
    let price = parseFloat(Math.round(initialPrice * 100) / 100).toFixed(2);
      this.setState({
      value: nextValue,
      price: price
    });
  };

  onPressAddDrinks = (drink, price, quantity) => {
    let drinksObj = {
      ...drink,
      quantity
    };
    let updateMethod = 'add';
    this.props.basket.filter(basketDrink => {
      if (basketDrink.name === drink.name) {
        updateMethod = 'update';
      }
    });
    this.props.updateBasket(drinksObj, updateMethod, this.props.basket, this.props.categories);
    this.closeModal();
};

  closeModal = () => {
    this.props.modalVisible();
    this.setState({
      value: 1,
      price: null
    })
  };

  render() {
    return (
      <View>
        <Overlay
          onBackdropPress={this.props.onBackdropPress}
          containerStyle={styles.overlay}
          childrenWrapperStyle={{ backgroundColor: "#eee" }}
          isVisible={this.props.isVisible}
          animationType="zoomIn"
          borderRadius={10}
          width="auto"
          height="auto"
        >
          <View style={styles.overlayCard}>
            <View style={styles.container}>
              <Text style={styles.title}>{this.props.drinkDetails.name}</Text>
              <View style={styles.rowContainer}>
                <View style={styles.pad}>
                  <Text style={styles.item}>
                    Quantity: {this.state.value}{" "}
                  </Text>
                </View>
                <SimpleStepper
                  value={this.state.value}
                  imageHeight={10}
                  imageWidth={20}
                  tintColor={colours.orange}
                  valueChanged={value => this.valueChanged(value)}
                />
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.closeModal()}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.onPressAddDrinks(this.props.drinkDetails, this.state.price ? this.state.price : this.props.drinkDetails.price, this.state.value)}
                >
                {this.props.basketAction ? 
                <Text style={styles.textStyle}>Update £{this.state.price ? this.state.price : this.props.drinkDetails.price}</Text>
                :
                <Text style={styles.textStyle}>Add £{this.state.price ? this.state.price : this.props.drinkDetails.price}</Text>}
                </TouchableOpacity>


              </View>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize:16,
	  color: colours.midnightBlack,
	  textAlign: 'center'
  },

  buttonStyle: {
  padding:10,
  marginTop: 10,
  marginRight: 5,
	backgroundColor: 'white',
  borderRadius:5,
  borderColor: colours.orange,
  borderWidth: 1,
  },
  pad: {
    paddingTop: "2%"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "7%",
    borderBottomColor: "black"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: Dimensions.get("window").height / 44,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "5%"
  },
  overlayCard: {
    height: Dimensions.get("window").height / 5,
    width: Dimensions.get("window").width / 1.5,
    alignContent: "center"
  },
  title: {
    fontWeight: "800",
    fontSize: 18
  },
  item: {
    fontWeight: "600",
    fontSize: 16
  }
});

const mapStateToProps = state => {
  return {
    basket: state.basket.basket,
    categories: state.basket.categories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateBasket: (drink, basketAction, oldBasket, oldCategories) => dispatch(actions.updateBasket(drink, basketAction, oldBasket, oldCategories))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDrinks);
