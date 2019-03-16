import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as colours from './../../styles/colourScheme'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import {Card, ListItem} from "react-native-elements";
import ShowOrder from '../../components/UI/Overlays/ShowOrder';

class componentName extends Component {

  state = {
    pastOrders: [],
    selectedOrder: null,
    showOrderOverlay: false
  };

  componentDidMount() {
    this.props.findUserOrders();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        pastOrders: nextProps.pastOrders
      });
    }
  }

  toggleOrderOverlay = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        showOrderOverlay: !prevState.showOrderOverlay
      }
    })
  };

  render() {
    const spinner = this.props.ordersLoading ? <ActivityIndicator size="large" color={colours.orange} /> : null;
    let renderPastOrders = null;
    if (this.state.pastOrders) {
      renderPastOrders = this.state.pastOrders.map((order,i) => {
      return (
          <TouchableOpacity onPress={() => this.toggleOrderOverlay()} key={i}>
          <Card
                key={i}
                title={order.transactionId ? `#${order.transactionId.slice(0, 7).toUpperCase()}` : `#${Math.random().toString(36).substring(2, 9).toUpperCase()}` }
                containerStyle={{backgroundColor: colours.lightGrey}}
                titleStyle={{color: colours.midBlue, fontWeight: 'bold', fontSize: 24}}
                dividerStyle={{backgroundColor: colours.pureWhite}}>
                  <ListItem
                  key={i}
                  titleStyle={{color: colours.midnightBlack, fontWeight: 'bold'}}
                  containerStyle={{backgroundColor: colours.lightGrey}}
                  title={`The Taf: ${order.collectionPoint}`}
                  bottomDivider
                  subtitle={
                    <View style={styles.subtitleView}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.subInformationText}>{new Date(order.date).toDateString()}</Text>
                        <Text style={styles.subInformationText}>{new Date(order.date).toTimeString().slice(0,8)}</Text>
                        <Text style={styles.subInformationTextPrice}>{order.status}</Text>
                      </View>
                        {order.drinks.map((drink, index) => (
                            <Text key={index} style={styles.subInformationDrinksText}>{drink.name}</Text>
                        ))}
                    </View>
                  }/>
                </Card>
          </TouchableOpacity>
      )
      });

    return (
          <View style={[styles.container]}>
            <ScrollView>
              <View>
                {spinner}
                {renderPastOrders}
              </View>
              <ShowOrder
                  visible={this.state.showOrderOverlay}
                  hideOrder={this.toggleOrderOverlay}/>
            </ScrollView>
          </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: colours.midnightBlack,
    color: colours.white,
    flex: 1
},
containerText: {
    height: (Dimensions.get("window").height / 6),
},
text: {
    color: colours.white,
},
subInformationText: {
  color: colours.darkGrey
},
  subInformationDrinksText: {
    fontWeight: 'bold',
    color: colours.midBlue,
  },
  subInformationTextPrice: {
    color: colours.warningRed,
    fontWeight: 'bold'
  },
  subtitleView: {
    paddingTop: 5
  }
});

const mapDispatchToProps = dispatch => {
  return {
    findUserOrders: () => dispatch(actions.orderHistory()),
  };
};

const mapStateToProps = state => {
  return {
    ordersLoading: state.order.loading,
    pastOrders: state.order.pastOrders
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(componentName);
