import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Button } from "react-native";
import { Overlay } from "react-native-elements";
import { SimpleStepper } from "react-native-simple-stepper";
import ButtonWithBackground from "../../Buttons/ButtonWithBackground";
import * as colours from "../../../../styles/colourScheme";

class OverlayComponent extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: 1,
    price: '2.09'
  };

  valueChanged = value => {
    const nextValue = Number(value.toFixed(2));
    this.setState({ value: nextValue });
  };

  render() {
    // console.log(this.state);
    return (
      <View>
        <Overlay
          onBackdropPress={this.props.onBackdropPress}
          ccontainerStyle={styles.overlay}
          childrenWrapperStyle={{ backgroundColor: "#eee" }}
          isVisible={this.props.isVisible}
          animationType="zoomIn"
          borderRadius={10}
          width="auto"
          height="auto"
        >
          <View style={styles.overlayCard}>
            <View style={styles.container}>
              <Text style={styles.title}>Fosters</Text>
              <View style={styles.rowContainer}>
                <View style={styles.pad}>
                <Text style={styles.item}>Quantitiy x {this.state.value} </Text>
                </View>
                <SimpleStepper
                  value={this.state.value}
                  imageHeight={10}
                  imageWidth={20}
                  tintColor={colours.orange}
                  // backgroundColor={colours.orange}
                  valueChanged={value => this.valueChanged(value)}
                />
              </View>
              <View style={styles.btnContainer}>
                <Button title='Cancel'
                  color={colours.darkGrey}
                  textColor={colours.cream}
                  // onPress={() => this.onLoginButtonHandler("Login")}
                >
                </Button>
                <Button
                  title={'Add (£2.09)'}
                  color={colours.darkOrange}
                  textColor={colours.cream}
                  // onPress={() => this.onLoginButtonHandler("Sign Up")}
                >

                </Button>
              </View>
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  pad:{
    paddingTop: '2%'
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
    // paddingBotton: '25%',
    borderBottomColor: "black"
    // borderBottomWidth: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: '7%'
  },
  container: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: 'red',
    // justifyContent: 'center',
    alignItems: "center",
    paddingTop: "5%"
  },
  overlayCard: {
    height: Dimensions.get("window").height / 6,
    width: Dimensions.get("window").width / 1.5,
    alignContent: "center"
  },
  title: {
    fontWeight: "600",
    fontSize: 16
  },
  item: {
    fontWeight: "600",
    fontSize: 16
  }
});

export default OverlayComponent;
