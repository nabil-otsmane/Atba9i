import React from 'react';
import { StyleSheet, Animated, Easing, Dimensions , Image , TouchableOpacity , KeyboardAvoidingView } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Input from './input';


export default class HomeScreen extends React.Component {

    static navigationOptions = {
      header : null
    }

    state = { height : new Animated.Value(0) , border : new Animated.Value(300)
    };

    onSwipeUp(state) {
      Animated.sequence([
        Animated.timing(this.state.height, {
          toValue : 1,
          duration : 300,
          easing : Easing.inOut(Easing.quad),
        }),
         Animated.spring(this.state.border, {
          toValue : 300
        })]).start();
    }

    onSwipe(direction, state) {
      const { SWIPE_UP } = swipeDirections;

      switch(direction) {
        case SWIPE_UP:
          this.onSwipeUp(state);
          break;
      }

    }

    render(){

        return(
          <KeyboardAvoidingView style={styles.container} enabled>
            <GestureRecognizer
                  onSwipeUp={(state) => this.onSwipeUp(state)}
                  onSwipe={(direction, state) => this.onSwipe(direction, state)}
                  config={{
                    velocityThreshold : 0.3,
                    directionalOffsetThreshold: 80
                  }}
                  style={styles.container}>

                   <Image style={ [styles.LogoImage]}
                 source={require('../assets/Logo-02.png')} resizeMode={'contain'}
                  />
                  <Image style={ [styles.ParticlesImage]}
                 source={require('../assets/Particles.png')}
                  />

                <Animated.View style={[styles.CircleShapeView, { height : this.state.height.interpolate({
                  inputRange : [0,1],
                  outputRange : [500, Dimensions.get("window").height]
                }), transform : [{
                  translateY: this.state.height.interpolate({
                    inputRange : [0, 1],
                    outputRange : [0, -Dimensions.get("window").height + 400]
                  })
                }], borderRadius : this.state.border
               }]}>
               <Animated.View style={[styles.Input , {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <Input navigation={this.props.navigation} />

                </Animated.View>
                {/* <Animated.View style={[styles.SubButtonCont , {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <TouchableOpacity onPress={this.GetRecipe} >

                      <Image style={styles.SubmitButton}
                    source={require('../assets/Submit.png')}
                      />
                    </TouchableOpacity>
                  </Animated.View> */}
                {/* <Animated.View style={[{opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <TouchableOpacity style={styles.SubButtonCont} >

                      <Image style={styles.SubmitButton}
                    source={require('../assets/Submit.png')}
                      />
                    </TouchableOpacity>
                  </Animated.View> */}

               <Animated.View style={[{opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [1, 0]
                    }) }]}>
               <Image style={ [styles.ArrowImage]}
                 source={require('../assets/Arrowup.png')}
                  />
                  </Animated.View>
                    <Animated.Text style={[styles.MainText, {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [1, 0]
                    }) }]} > Glissez pour commencer </Animated.Text>

                </Animated.View>
              </GestureRecognizer>
              </KeyboardAvoidingView>

        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems : "center",
      backgroundColor: '#2fbb55',
      justifyContent : "space-between"

    },CircleShapeView: {
        marginTop : "100%",
        justifyContent : "center",
        alignItems : "center",
        width : 500,
        backgroundColor: '#fff'
    }, MainText : {
        fontSize : 20,
        fontFamily :"Poppins-ExtraLight"
    },
    LogoImage : {
        marginTop : 60,
        position :"absolute",
        width: 230,
        zIndex : 1,
        height: 150,

      },ParticlesImage : {
        marginTop : 20,
        position :"absolute",
        width: "100%",
        zIndex : 1,
        height: 130,

      },
      ArrowImage : {
        width : 40 ,
        height : 50 ,
        marginBottom : 20
      },
      Input : {
      position : "absolute" ,
      top : 50 ,
      height : 320 ,
      width : 300
      },

  });
