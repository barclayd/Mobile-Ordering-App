import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import * as colours from '../../styles/colourScheme';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {Card} from 'react-native-elements';
import ButtonWithBackground from '../UI/Buttons/ButtonWithBackground';
import {distanceCalculator} from '../../utility/maps';
import Icon from "react-native-vector-icons/FontAwesome";
import {RNNotificationBanner} from "react-native-notification-banner";

class MapDisplay extends Component {

    state = {
        focusedLocation: {
            latitude: 51.4866609,
            longitude: -3.182559,
            latitudeDelta: 0.015,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.015
        },
        chosenMarker: null,
        notificationSent: false
    };

    async componentDidMount() {
        // await this.getLocationHandler();
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
        this.setState({
            chosenMarker: markerId
        });
    };

    handleCalloutPress = () => {
      if (this.state.chosenMarker) {
          this.props.findBar(this.state.chosenMarker, this.props.componentId, null, this.props.redirect);
      }
    };

    handleNotificationPress = (barCode) => {
        this.props.findBar(barCode, this.props.componentId, null, this.props.redirect);
    };

    showNearestBar = (bar) => {
        if (bar && !this.state.notificationSent) {
            let map = <Icon name="map-o" size={24} color="#FFFFFF" family={"FontAwesome"} />;
            setTimeout(() => {
                RNNotificationBanner.Info({ onClick: () => this.handleNotificationPress(bar.barCode), duration: 5, title: `Nearest DrinKing: ${bar.name}`, subTitle: `Tap to View the Menus for ${bar.name}`, withIcon: true, icon: map});
            }, 5000);
            this.setState({
                notificationSent: true
            });
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
        const distanceFromBars = [];
        const barMarkers = this.props.bars.map((bar, index) => {
            if(this.props.userCoordinates) {
                const distance = distanceCalculator(bar.latitude, bar.longitude, this.props.userCoordinates.latitude, this.props.userCoordinates.latitude);
                distanceFromBars.push({
                    name: bar.name,
                    distance,
                    barCode: bar.barCode
                });
            }
            let markerCoordinates = {
                ...this.state.focusedLocation,
                latitude: bar.latitude,
                longitude: bar.longitude
            };
            return <Marker identifier={bar.barCode} key={index} style={styles.marker} coordinate={markerCoordinates} image={require('../../assets/logo-small.png')} onPress={(event) =>this.handleMarkerPress(event)}>
                    <Callout style={styles.callout}>
                            <View>
                                <Text style={styles.calloutHeader}>{bar.name}</Text>
                            </View>
                        <Card
                            containerStyle={styles.cardContainer}
                            imageStyle={styles.image}
                            image={{uri: bar.image}}>
                            <Text style={{marginBottom: 10}}>
                                {bar.description}
                            </Text>
                            <ButtonWithBackground style={styles.selectButton} onPress={() => this.handleCalloutPress()} textColor={colours.pureWhite} color={colours.midBlue}>
                                View {bar.name}
                            </ButtonWithBackground>
                        </Card>
                </Callout>
            </Marker>
        });
        if (distanceFromBars.length > 0) {
            const shortestDistance = distanceFromBars.reduce((min, bar) => bar.distance < min ? bar.distance : min, distanceFromBars[0].distance);
            const closestBar = distanceFromBars.filter(bar => bar.distance === shortestDistance);
            this.showNearestBar(closestBar[0]);
        }
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
        fontSize: 22,
        color: colours.orange,
    },
    image: {
        width: 'auto',
        height: 150
    },
    cardContainer: {
        width: 200,
        justifyContent: 'flex-start',
    },
    selectButton: {
        marginRight: 20
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
        findBar: (barCode, componentId, autoLogin, redirect) => dispatch(actions.findBar(barCode, componentId, autoLogin, redirect))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
