import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay } from "react-native-elements";

class OrderPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
              <Text style={styles.title}>hello</Text>
              <View style={styles.rowContainer}>
                <View style={styles.pad}>
                  <Text style={styles.item}>
                    hello sir
                  </Text>
                </View>
                
              </View>
          </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    overlay: {
        // position: "absolute",
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
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5%"
      },
    
});

export default OrderPending;
