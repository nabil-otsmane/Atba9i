import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

export default class extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.pub}>
          <Text style={styles.pubText}>Meilleur avec SIM</Text>
          <Image style={styles.pubLogo} source={require("../assets/Arrow_left.png")} />
        </View>
        <View style={styles.ingList}>
          <Text style={styles.ingr}>1 paquet macaronis SIM (500g)</Text>
          <Text style={styles.ingr}>2 oignons hachés finement</Text>
          <Text style={styles.ingr}>1/2 tasse céleri haché finement</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    height : 300,
    width : 500
  },
  pub : {
    width : "100%",
    height : 150,
    flexDirection : "row",
    justifyContent : "space-evenly",
    alignItems : "center"
  },
  pubText : {
    fontSize : 22,
    color : "#2152fd"
  },
  pubLogo : {
    width : 100,
    height : 100,
  },
  ingList : {
    width : "100%",
    padding : 20,
    backgroundColor : "#fff"
  },
  ingr : {
    color : "#ccc",
    fontSize : 12,
    margin : 5
  }
});
