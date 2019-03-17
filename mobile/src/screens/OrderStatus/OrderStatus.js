import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import * as colours from '../../styles/colourScheme';
import {Navigation} from "react-native-navigation";
import * as Progress from 'react-native-progress';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class OrderStatus extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    state = {
        orderStatus: []
    }

    componentDidMount(){
        console.log("mounted");
        this.props.findOrderById(this.props.orderNumber)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps,"nextProps")
        if (!nextProps.loading) {
          this.setState({
            orderStatus: nextProps.orderStatus
          });
        }
      }

      componentDidUpdate(){
          console.log("this.state",this.state)
      }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "menuButton") {
            !this.isSideDrawerVisible
                ? (this.isSideDrawerVisible = true)
                : (this.isSideDrawerVisible = false);
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.isSideDrawerVisible
                    }
                }
            });
        }
        if (buttonId === "profileButton") {
            !this.isSideDrawerVisible
                ? (this.isSideDrawerVisible = true)
                : (this.isSideDrawerVisible = false);
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    right: {
                        visible: this.isSideDrawerVisible
                    }
                }
            });
        }
    }

    render() {
        return (

            <View style={[styles.container]}>

                {this.state.orderStatus.findOrderById ?

                <View style={styles.header}>
                <Text style={styles.status}>Order Successful!</Text>
                <Text style={styles.success}>Thank You {this.state.orderStatus.findOrderById.userInfo.name}!</Text>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Status:</Text>
                <Text style={styles.orderSubtitle}>{this.state.orderStatus.findOrderById.status} </Text>
                <Progress.Circle size={30} indeterminate={true} color={colours.orange} thickness={15}/>
                </View>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Order Number :</Text>
                <Text style={styles.orderSubTitle}>{this.props.orderNumber}</Text>
                </View>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Ordered at :</Text> 
                <Text style={styles.date}>{new Date(this.state.orderStatus.findOrderById.date).toTimeString().slice(0,8)}</Text>
                <Text style={styles.date}>{new Date(this.state.orderStatus.findOrderById.date).toDateString()}</Text>
                </View>
                <View style={styles.progressCircle}>
                <Text style={styles.orderText}>Collection Point:</Text>
                <Text style={styles.orderSubtitle}>{this.state.orderStatus.findOrderById.collectionPoint}</Text>
                </View>
                <Text style={styles.orderText}>Estimated Collection Time :</Text>
                <Text style={[styles.status, styles.padd]}>Order Summary</Text>
                <View style={styles.recipt}>
                <Text style={styles.orderText}>Items</Text>
                <Text style={styles.orderText}>Price</Text>
                </View>
                {this.state.orderStatus.findOrderById.drinks.map((drinks,i) => {
                    return(
                        <View key={i}style={styles.recipt}>
                        <View>
                        <Text style={styles.orderText}>{drinks.name}</Text>
                        </View>
                        <View>
                        <Text style={styles.orderText}>{drinks.price}</Text>
                        </View>
                        </View>
                    )
                })}

                </View>

                :null}

                {/* <View style={styles.box}>
                <Text style={styles.status}>In Progress...</Text>
                </View>
                

                <View style={styles.orderInfo}>
                    <Text style={styles.text}> Order Number </Text>
                     
                <TouchableOpacity>
                        <Text style={styles.text}> View QR Code </Text>
                    </TouchableOpacity>
                </View> */}

                {/* <TouchableOpacity style={styles.qrCode}>
                    <Text>View QR Code</Text>
                    </TouchableOpacity> */}
                </View>
        );
    }
}

const styles = StyleSheet.create({
    progressCircle:{
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: "center",
    },
    padd:{
        marginTop:25
     },
    recipt:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        },
    right:{
        justifyContent:'flex-end',
        flexDirection: "row",
    },
    box:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 10,
        marginRight: 10,
        marginLeft: 10,
        borderColor: colours.cream,
        borderWidth: 2
    },
    orderInfo:{
    paddingTop: 10,
    paddingRight: 10,
    },
    status:{
      fontSize: 24,
      fontWeight: '800',
      color: colours.cream,
      padding: 10,
    },
    success:{
        fontSize: 20,
        fontWeight: '600',
        color: colours.cream,
        paddingTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        color: colours.orange,
        marginBottom: 25,
      },
    date:{
        fontSize: 16,
        fontWeight: '600',
        color: colours.orange,
        padding: 10,   
    },
    orderText:{
        fontSize: 16,
        fontWeight: '400',
        color: colours.cream,
        padding: 10,
      },
      orderSubtitle:{
        fontSize: 16,
        fontWeight: '600',
        color: colours.cream,
        padding: 10,
      },
    container: {
        paddingTop: 22,
        backgroundColor: colours.midnightBlack,
        color: colours.white,
        flex: 1
    },
    qrCode:{
        width: Dimensions.get("window").width,
        color: 'white',
        backgroundColor: 'white',
        marginTop: 25,
        borderRadius: 5


    },
    containerText: {
        height: (Dimensions.get("window").height / 6),
    },
    text: {
        color: colours.white,
    }
});

const mapStateToProps = state => {
    return {
      orderStatus: state.order.orderStatus
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      findOrderById: (id) => dispatch(actions.orderStatus(id))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderStatus);
