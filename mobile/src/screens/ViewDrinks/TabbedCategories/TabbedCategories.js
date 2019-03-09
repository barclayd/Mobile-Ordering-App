import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Card} from "react-native-elements";
import OverlayComponent from "../../../components/UI/Backgrounds/Overlay/OverlayComponent";
import * as colours from "../../../styles/colourScheme"
import {connect} from 'react-redux';

class TabbedCategories extends Component {
  state = {
    isVisible: false,
    drinkSelected: {},
    trashCanVisible: false,
    itemSelected: "",
    quantity: 0
  };

  openOverlay = (i) => {
    const drinkSelected = this.props.drinks[i];
    console.log("drinkSelected",drinkSelected);
    this.setState({
      isVisible: true,
      drinkSelected: drinkSelected
    });
  };

  onBackdropPress = () => {
    this.setState({
      isVisible: false
    });
  };

  setModalVisible = () => {
    this.setState({
      isVisible: false
    });
  };

  _onLongPressButton = (i,u) => {
    console.log("this.props.basket",this.props.basket)
    // let basketItems = []
  //   this.props.basket.map(drink => {
  //     basketItems.push({name: drink.name, quantity: drink.quantity})
  // });
  // console.log("basketItems",basketItems)
    this.setState({
      trashCanVisible: !this.state.trashCanVisible,
      itemSelected: u.name,
      // basketItems: basketItems
    });
  }

  componentDidUpdate(){
    console.log(this.state.trashCanVisible," Trash can vis")
  }

  basketItems = (name) => {
    let totalItems = 0;
    this.props.basket.map(drink => {
        if (drink.name == name)
          totalItems += drink.quantity
      });
    return totalItems;
    };


  render() {
    console.log(this.props.category);
    return (
      <View>
        {this.props.drinks.length > 0 ? this.props.drinks.map((u, i) => {
          return (
            <TouchableHighlight key={i} onPress={() => this.openOverlay(i)}  onLongPress={()=> this._onLongPressButton(i,u)} underlayColor="white">
              <Card>
                <View style={styles.rowContainer}>

                  <View style={styles.leftContainer}>
                    <Text style={styles.name}>{u.name}</Text>
                  </View>

                  
                  <View>
                  <Text style={styles.price}>£{u.price}</Text>
                  </View>
                  </View>

                  <Text style={styles.description}>{u.nutritionInfo}</Text>

                  <View style={styles.trashContainer}>

                  {this.state.trashCanVisible &&  this.props.drinks[i].name == this.state.itemSelected ? 
                  <Icon name="trash-o" style={styles.trash} size={30} color={colours.orange}/> 
                  : null}

                  {this.state.trashCanVisible && this.props.drinks[i].name == this.props.basket.map(drink => drink.name) && this.props.drinks[i].name == this.state.itemSelected ?
                  <Text style={styles.price}>x{this.basketItems(u.name)}</Text>
                  :null}

                  </View>
                
                
              </Card>
            </TouchableHighlight>
          );
        }):null}
        <OverlayComponent
          modalVisible={this.setModalVisible}
          drinkDetails={this.state.drinkSelected}
          isVisible={this.state.isVisible}
          onBackdropPress={this.onBackdropPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    fontWeight: "400"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  trashContainer: {
    flexDirection: "row",
    justifyContent: "flex-start"
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
  }
};

export default connect(mapStateToProps, null)(TabbedCategories)
