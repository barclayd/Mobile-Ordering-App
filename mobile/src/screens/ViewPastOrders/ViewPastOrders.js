import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as colours from './../../styles/colourScheme'
import { ViewPastOrders } from '../../utility/screens';
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class componentName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pastOrders: []
    };
  }

  componentDidMount() {
    console.log("mounting menu screen");
    this.props.findUserOrders();
  }

  componentWillReceiveProps(nextProps) {
    console.log("props recieved", nextProps);
    if (!nextProps.loading) {
      this.setState({
        pastOrders: nextProps.pastOrders
      });
    }
  }

  renderPastOrders = () => {
    console.log("this.state",this.state.pastOrders)
    // return <View>(
    //   {this.state.pastOrders.map((order, i) => (
    //       <Text key={i}>Hello, {order.date}</Text>
    //   ))}
    //   )</View>
    this.state.pastOrders.map((order,i) => <Text key={i} style={styles.text}>Test</Text>)
  };

  render() {
    return (
      <View style={[styles.container]}>
          <View>{this.state.pastOrders.length > 0 ? this.renderPastOrders() : null}</View>
        </View>
    );
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
}
});

const mapDispatchToProps = dispatch => {
  return {
    findUserOrders: () => dispatch(actions.orderHistory()),
  };
};

const mapStateToProps = state => {
  return {
    pastOrders: state.order.pastOrders
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(componentName);
