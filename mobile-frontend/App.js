import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class App extends Component {
  render() {
    return (
        <LinearGradient colors={['#43C6AC', '#191654']} style={styles.linearGradient}>
          <Text style={styles.buttonText}>
            Sign in with Facebook
          </Text>
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  }
});
