import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
  TouchableHighlight
} from 'react-native';
import Response from './response2';
import Responsee from './response';

//<Item img="../assets/plate.jpg" titre="Macaroni au fromage" desc="Plat français beau comme la poubelle, ce paragraphe n'a pas de sense" />

let items = [
  { img : require("../assets/Macaron_a_la_sauce_tomate.png"), titre : "French Fries", desc : "this is a useless description of what french fries are.", temps : "30 min", calorie : "350", complete : "80%"},
  { img : require("../assets/Macaron_a_la_sauce_tomate.png"), titre : "frite", desc : "kichghol cv", temps : "30 min", calorie : "350", complete : "80%"},
  { img : require("../assets/Macaron_a_la_sauce_tomate.png"), titre : "frite", desc : "kichghol cv", temps : "30 min", calorie : "350", complete : "80%"},
  { img : require("../assets/Macaron_a_la_sauce_tomate.png"), titre : "frite", desc : "kichghol cv", temps : "30 min", calorie : "350", complete : "80%"},
];

export default class FoodList extends Component {

  render() {

    const { navigation } = this.props;

    const list = navigation.getParam("list", []);

    let side = true;
    return (
      <FlatList
        data={list}
        renderItem={({item}) => {
          let Compo = side ? Response : Responsee;
          side = !side;
          return (
            <TouchableHighlight /*onPress={() => this.props.navigation.navigate("plate", { ...item })}*/>
              <Compo img={item.photo} titre={item.name} desc={item.description} temps={item.cookingTime} calorie={item.calories} complete={item.percentage} />
            </TouchableHighlight>);
        }}
        keyExtractor={(item, id) => item.id}
        style={{flex : 1}} />
    );
  }
}
