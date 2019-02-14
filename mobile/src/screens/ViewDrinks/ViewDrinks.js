import React, {Component} from 'react';
import {Navigation} from "react-native-navigation";
import {View, Text} from 'react-native';

class ViewDrinks extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId === "menuButton") {
            (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: this.isSideDrawerVisible,
                    }
                }
            });
        }
        if (buttonId === "profileButton") {
            (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false;
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    right: {
                        visible: this.isSideDrawerVisible,
                    }
                }
            });
        }
    }

    render() {
        return (
            <View>
                <Text>View our best selling drinks</Text>
            </View>
        )
    }
}

export default ViewDrinks;
