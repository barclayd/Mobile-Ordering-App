import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as colours from './../../styles/colourScheme'
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class componentName extends Component {

  state = {
    pastOrders: []
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

  render() {

    const renderPastOrders = this.state.pastOrders.map((order,i) => {
      return <Text key={i} style={styles.text}>
        {order.collectionPoint}
      </Text>
      });

    return (
      <View style={[styles.container]}>
          <View>{this.state.pastOrders.length > 0 ? renderPastOrders : null}</View>
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
