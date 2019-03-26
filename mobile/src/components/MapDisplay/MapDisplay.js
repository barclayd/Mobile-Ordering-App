import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';


const mapDisplay = props => {

    return (
        <View style={styles.container}>
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 51.4816,
                longitude: -3.1791,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.122
            }}
        />
        </View>
    )
};

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

export default mapDisplay;
