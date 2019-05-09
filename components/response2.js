import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import Pie from 'react-native-pie';

export default class Response extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const data=[0.5];

    return (
      <View style={styles.container}>
        <Image source={{uri : this.props.img}} style={styles.img} />
        <View style={styles.content}>
          <Text style={styles.titre}>{this.props.titre}</Text>
          <Text style={styles.desc}>{this.props.desc}</Text>
          <View style={styles.stats}>
            <View style={styles.comp}>
              <Image source={require("../assets/Clock.png")} style={styles.icnTmp} resizeMode={'contain'} />
              <Text style={styles.tmp}>{this.props.temps}</Text>
            </View>
            <View style={styles.comp}>
              <Image source={require("../assets/Calories.png")} style={styles.icnCal} resizeMode={'contain'} />
              <Text style={styles.cal}>{this.props.calorie}</Text>
            </View>
            <View style={styles.comp}>
              <Pie
                  radius={28}
                  innerRadius={21}
                  series={[this.props.complete]}
                  colors={[this.props.complete<25?"#cc2511":this.props.complete<60?"#cc9902":"#56bb55"]}
                  backgroundColor="#eee" />
              <Text style={styles.percent}>{this.props.complete+"%"}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    height : "auto",
    width : "100%",
    flexDirection : "row",
    backgroundColor : "#fff",
    alignItems : "center"
  },
  imgCont : {
    height : "100%",
  },
  img : {
    width : 220,
    height : 220,
    left : -70
  },
  content : {
    width : "58%",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    left : -70,
    marginRight : 10 ,
        fontFamily: "Poppins-ExtraLight",

  },
  titre : {
    fontSize : 18,
    marginTop : 20 ,
    color : "#aaa",
    fontWeight : "bold",
    fontFamily: "Poppins-ExtraLight",

  },
  desc : {
    marginLeft : 25,
    fontSize : 15,
    color : "#ccc",
    fontFamily: "Poppins-ExtraLight",

  },
  stats : {
    width : "100%",
    marginTop : 15,
    flexDirection : "row",
    justifyContent : "space-evenly",
    alignItems : "center"
  },
  comp : {
    margin : 5,
    alignItems : "center"
  },
  icnTmp : {
    width : 20,
    height : 20
  },
  icnCal : {
    width : 17,
    height : 30
  },
  tmp : {
    color : "#ccc",
    fontSize : 12,
  },
  cal : {
    color : "#f20505",
    fontSize : 14,
  },
  percent : {
    top : -38 ,
    fontFamily: "Poppins-ExtraLight",
  }
});
