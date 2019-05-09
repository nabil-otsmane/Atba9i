import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Animated
} from 'react-native';
import Pie from 'react-native-pie';


/*
 *   Required Props : img, titre, desc
 *
 *   optional Props : temps, chaleur, health, direction ("right" or "left")
 *
 */
export default class ResponseItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.titre}>{this.props.titre}</Text>
          <Text style={styles.desc}>{this.props.desc}</Text>
          <View style={styles.stats}>
            <View style={styles.comp}>
              <Image source={require("../assets/Clock.png")} style={styles.icnTmp} />
              <Text style={styles.tmp}>{this.props.temps}</Text>
            </View>
            <View style={styles.comp}>
              <Image source={require("../assets/Calories.png")} style={styles.icnCal} />
              <Text style={styles.cal}>{this.props.calorie}</Text>
            </View>
            <View style={styles.comp}>
              <Pie radius={28}
                innerRadius={21}
                series={[this.props.complete]}
                colors={[this.props.complete<25?"#cc2511":this.props.complete<60?"#cc9902":"#56bb55"]}
                backgroundColor="#eee" />
              <Text style={styles.percent}>{this.props.complete+"%"}</Text>
            </View>
          </View>
        </View>
        <Image source={{uri : this.props.img}} style={styles.img} />
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
    alignItems : "center" ,
    marginTop : 0

  },
  imgCont : {
    height : "100%",
  },
  img : {
    width : 220,
    height : 220,
  },
  content : {
    width : "60%",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    paddingRight : 20,
    paddingLeft : 20 ,
    marginTop : 0
  },
  titre : {
    fontSize : 18,
    fontWeight : "bold",
    color : "#aaa",
    fontFamily: "Poppins-ExtraLight",
    marginTop : 0,

  },
  desc : {
    marginLeft : 25,
    fontSize : 15,
    fontFamily: "Poppins-ExtraLight",

    color : "#ccc"
  },
  stats : {
    width : "100%",
    marginTop : 15,
    flexDirection : "row",
    justifyContent : "space-between",
    alignItems : "center" ,
    backgroundColor :'#fff'
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
    top : -38
  }
});
