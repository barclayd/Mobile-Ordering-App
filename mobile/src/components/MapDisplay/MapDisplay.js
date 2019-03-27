import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as colours from '../../styles/colourScheme';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

class MapDisplay extends Component {

    state = {
        focusedLocation: {
            latitude: 51.4866609,
            longitude: -3.182559,
            latitudeDelta: 0.015,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.015
        },
        chosenMarker: null
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

    handleMarkerPress = (event) => {
        const markerId = event.nativeEvent.id;
        console.log(markerId);
        this.setState({
            chosenMarker: markerId
        })
    };

    handleCalloutPress = () => {
      if (this.state.chosenMarker) {
          this.props.findBar(this.state.chosenMarker, this.props.componentId);
      }
    };

    pickLocationHandler = event => {
        if (event.nativeEvent.coordinate) {
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
        }
    };

    render() {

        const barMarkers = this.props.bars.map((bar, index) => {
            let markerCoordinates = {
                ...this.state.focusedLocation,
                latitude: bar.latitude,
                longitude: bar.longitude
            };
            return <Marker identifier={bar.barCode} key={index} style={styles.marker} coordinate={markerCoordinates} image={require('../../assets/logo-small.png')} onPress={(event) =>this.handleMarkerPress(event)}>
                    <Callout style={styles.callout}
                        onPress={() => this.handleCalloutPress()}>
                            <View>
                                <Text style={styles.calloutHeader}>{bar.name}</Text>
                                <Text>{bar.description}</Text>
                            </View>
                </Callout>
            </Marker>
        });
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.focusedLocation}
                    ref={ref => this.map = ref}>
                    {this.props.bars.length > 0 ? barMarkers : null}
                </MapView>
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
    },
    callout: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    calloutHeader: {
        fontWeight: 'bold',
        color: colours.orange,
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
        findAllBars: () => dispatch(actions.findAllBars()),
        findBar: (barCode, componentId) => dispatch(actions.findBar(barCode, componentId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
