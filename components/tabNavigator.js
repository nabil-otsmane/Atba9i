import React, {Component} from 'react';
import Ingredients from './ingredients';
import Etapes from './etapes';
import {createMaterialTopTabNavigator} from 'react-navigation';

export default createMaterialTopTabNavigator({
  INGREDIENTS : {
    screen : Ingredients,
  },
  ETAPES : {
    screen : Etapes
  }
}, {
  initialRouteName : "ETAPES",
  tabBarOptions : {
    labelStyle : {
      color : "#65bb55",
      fontWeight : "bold",
      fontSize : 12
    },
    tabStyle : {
      width : 110,
    },
    style : {
      backgroundColor : "#fff",
    },
    indicatorStyle : {
      backgroundColor : "#65bb55"
    }
  }
});
