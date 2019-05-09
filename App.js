/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import FoodList from './components/plats.js';
import Plate from './components/plat.js';
import HomeScreen from './components/HomeScreen';
import {createStackNavigator} from 'react-navigation';


export default createStackNavigator({
  home : HomeScreen,
  list : FoodList,
  plate : Plate
}, {
  navigationOptions : {
    initialRouteName : "home",
    headerStyle : {
      backgroundColor : "#65bb55",
      height : 70,
      zIndex : 1
    },
    headerBackImage : () => {
      return (<Image source={require("./assets/Arrow_left.png")} style={{width : 55, height : 40}} />);
    },
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
