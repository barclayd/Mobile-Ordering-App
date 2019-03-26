import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

class MapDisplay extends Component {

    state = {
        focusedLocation: {
            latitude: 51.4816,
            longitude: -3.1791,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
        }
    };

    async componentDidMount() {
        await this.getLocationHandler();
        this.props.findAllBars();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.loadingBars) {
            this.setState({
                bars: nextProps.bars
            });
        }
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            this.map.animateToRegion({
                ...this.state.focusedLocation,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            });
            this.setState(prevState => {
                return {
                    ...prevState.focusedLocation,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }
            });
        });
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.focusedLocation}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: '90%',
        height: 425
    },
    landscapeMap: {
        width: '100%',
        height: 200
    }
});

const mapStateToProps = state => {
    return {
        bars: state.bar.bars,
        loadingBars: state.bar.findAllBarsLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        findAllBars: () => dispatch(actions.findAllBars())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
