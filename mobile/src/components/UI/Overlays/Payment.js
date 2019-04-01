import React, { Component } from "react";
import { Text, StyleSheet, View, Dimensions, AsyncStorage, TextInput } from "react-native";
import { Card, Overlay } from "react-native-elements";
import { CreditCardInput } from "react-native-credit-card-input";
import ButtonBackground from "../Buttons/ButtonWithBackground";
import RNPickerSelect from "react-native-picker-select";
import * as colours from "../../../styles/colourScheme";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import validate from '../../../utility/validation';

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

class MobilePayments extends Component {
  state = {
    userId: null,
    input : {
        email: {
            value: null,
            valid: false,
            validationRules: {
                isEmail: true
            },
            touched: false
        }
    },
    number: {
      valid: false,
      value: null
    },
    expiration: {
      valid: false,
      value: null
    },
    cvc: {
      valid: false,
      value: null
    },
    collectionPoint: {
      valid: false,
      value: null,
      id: null
    }
  };

  onInputChange = formData => {
    this.setState({
      number: {
        valid: formData.status.number === "valid",
        value: formData.values.number
      },
      expiration: {
        valid: formData.status.expiry === "valid",
        value: formData.values.expiry
      },
      cvc: {
        valid: formData.status.cvc === "valid",
        value: formData.values.cvc
      }
    });
  };

  inputHandler = (value) => {
    this.setState(prevState => {
        return {
            input: {
                email: {
                    ...prevState.input.email,
                    value: value,
                    valid: validate(value, this.state.input.email.validationRules, null),
                    touched: true
                },}
            }
        });  
  }

  render() {
    const placeholder = {
      label: "Select Collection Point",
      value: null,
      color: "gray"
    };

    const collectionPoints = [];

    if (this.props.collectionPoints) {
      this.props.collectionPoints.map(points => {
        collectionPoints.push({
          label: points.name,
          value: points.name,
          id: points.id
        });
      });
    }

    const userInfo =
      this.props.auth === null ? (
        <View style={styles.userInfo}>
        <View>
            <TextInput
            style={[styles.input, !this.state.input.email.valid && this.state.input.email.touched ? styles.invalid : null]}
            placeholder='Email'
            placeholderTextColor={colours.pureWhite}
            autoComplete='email'
            autoCorrect={false}
            keyboardType='email-address'
            selectionColor={colours.orange}
            textContentType='emailAddress'
            autoCapitalize='none'
            value={this.state.input.email.value}
            onChangeText={(val) => this.inputHandler(val)}/>
        </View>
        </View>
      ) : (
        <View
        style={styles.successUserInfo}
      >
        <Text style={styles.collectionPoint}>User Infomation </Text>

        <Icon
          name="check"
          style={{ top: -6 }}
          size={24}
          color={colours.green}
        />
        </View>
      );

    return (
      <Overlay
        animationType="slide"
        height={(screenHeight / 3) * 2.3}
        width={screenWidth / 1.05}
        overlayBackgroundColor={colours.midnightBlack}
        overlayStyle={styles.overlayBorder}
        onBackdropPress={this.props.hidePayment}
        isVisible={this.props.visible}
      >
        <View style={[{ height: screenHeight / 2.5 }]}>
          <Text style={styles.header}>Checkout</Text>
          <CreditCardInput
            cardScale={0.7}
            onChange={this.onInputChange}
            labelStyle={{ color: colours.pureWhite }}
            inputStyle={{ color: colours.orange }}
            allowScroll
          />

          <View style={styles.picker}>
            <View>
              <Text style={styles.collectionPoint}>COLLECTION POINT</Text>
            </View>
            <View style={styles.pad}>
              <RNPickerSelect
                placeholder={placeholder}
                items={collectionPoints}
                onValueChange={value => {
                  collectionPoints.map(cps => {
                    if (value === cps.label) {
                      this.setState({
                        collectionPoint: {
                          id: cps.id,
                          valid: true,
                          value: value
                        }
                      });
                    }
                  });
                }}
                style={{ color: colours.pureWhite, paddingRight: 30 }}
                value={this.state.collectionPoint.value}
                // Icon={() => {
                //     return <Icon name="chevron-down" size={20} color="gray" />;
                // }}
              />
            </View>
          </View>

          <View style={{ paddingVertical: 5 }} />

            {userInfo}

          <Card
            containerStyle={{
              backgroundColor: colours.midnightBlack,
              marginTop: 25
            }}
          >
            <View style={styles.summary}>
              <Text style={styles.barOrderDetails1}>
                Items: {this.props.basketItems}
              </Text>
              <Text style={{ color: colours.midGrey, fontSize: 30 }}>|</Text>
              <Text style={styles.barOrderDetails2}>
                Price: £{this.props.basketPrice}
              </Text>
            </View>
          </Card>

          <View style={[{ height: screenHeight / 5.1 }, styles.buttons]}>
            <View style={styles.buttonStyle}>
              <ButtonBackground
                color={colours.warningRed}
                onPress={this.props.onCancel}
                textColor={colours.white}
              >
                Cancel
              </ButtonBackground>
            </View>
            <View style={styles.buttonStyle}>
              <ButtonBackground
                color={colours.white}
                disabled={
                  !this.state.cvc.valid ||
                  !this.state.number.valid ||
                  !this.state.expiration.valid ||
                  !this.state.collectionPoint.valid ||
                  (!this.state.userId && this.state.input.email.valid)
                }
                textColor={colours.orange}
                onPress={() => this.props.submitOrder(this.state)}
              >
                Pay
              </ButtonBackground>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayBorder: {
    borderColor: colours.darkGrey,
    borderWidth: 3
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonStyle: {
    marginRight: 18
  },
  barOrderDetails1: {
    fontWeight: "bold",
    color: colours.midGrey
  },
  barOrderDetails2: {
    fontWeight: "bold",
    color: colours.orange
  },
  header: {
    fontWeight: "bold",
    color: colours.white,
    fontSize: 24,
    textAlign: "center"
  },
  picker: {
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  collectionPoint: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold"
  },
  pad: {
    marginTop: 5
  },
  userInfo: {
    alignContent: "flex-start",
    paddingHorizontal: 20
  },
  successUserInfo: {
    flexDirection: 'row',
    alignContent: "flex-start",
    paddingHorizontal: 20
  },
  input: {
    width: screenWidth / 5* 4,
    height: screenHeight / 18,
    borderBottomWidth: 1,
    borderColor: colours.cream,
    borderRadius: 2,
    color: colours.pureWhite,
    fontSize: 16,
    textAlign: 'left'
},
invalid: {
    borderColor: colours.warningRed,
    color: colours.warningRed
},
});

const mapStateToProps = state => {
  return {
    auth: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  null
)(MobilePayments);
