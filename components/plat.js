import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ScrollView ,
  Modal
} from 'react-native';
import Ingredients from './ingredients';
import TabNav from './tabNavigator';

export default class Plat extends Component {

  render() {

    const { navigation } = this.props;
    const img = navigation.getParam('photo', '../assets/plate.jpg');
    const plat = navigation.getParam('name', 'This is the default Food');
    const ingredients = navigation.getParam("ingredient", []);
    const temps = navigation.getParam('cookingTime', 100);
    const percentage = navigation.getParam('percentage', 0);
    const calories = navigation.getParam('calories', 100);

    return (
    <ScrollView>
          <View style={styles.header}>
            <Image source={{uri : img}} style={styles.img} />
            <View style={styles.cont}>
              <View style={styles.stats}>
                <View style={styles.comp}>
                  <Image source={require("../assets/Calories.png")} style={styles.icnTmp} />
                  <Text style={styles.tmp}>{temps+"min"}</Text>
                </View>
                <View style={styles.comp}>
                  <Image source={require("../assets/Clock.png")} style={styles.icnCal} />
                  <Text style={styles.cal}>{}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.tab}>
            <Ingredients ingreds={ingredients} />
          </View>
    </ScrollView>

    );
  }

}


const styles = StyleSheet.create({
  header : {
    marginTop : 20,
    alignItems : "center",
  //  backgroundColor : "#fff"
  },
  img : {
    top : -70,
    width : 300,
    height : 300,
  },
  cont : {
    padding : 5
  },
  titre : {
    textDecorationLine : "underline",
    fontSize : 14,
    color : "#666"
  },
  stats : {
    width: '100%',
    flexDirection : "row",
    justifyContent : "space-evenly"
  },
  comp : {
    flexDirection : "column",
    alignItems : "center"
  },
  icnTmp : {
    width : 40, height : 20
  },
  icnCal : {
    height : 30, width : 17
  }
});
