import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
  Slider,
  CheckBox,
  ScrollView
} from 'react-native';
import AutoComplete from 'react-native-autocomplete-select'

var IngredientsItem = null;

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      CalNum: 100,
      Time: 10,
      Ingredients: [],
      suggestions: [],
      Maladie: [],
      ValidateMaladie: [],
      Visible: "Input",

    }


  }


  changeHandler = value => {
    this.setState({
      InputValue: value
    })
  }

  DeleteHandler = (itemDetected) => {
    this.setState(prevState => {
      if (prevState.Ingredients.length > 1) {
        return {
          Ingredients: prevState.Ingredients.filter(item => item !== itemDetected)
        }
      } else {
        return {
          Ingredients: []
        }
      }

    })

  }

  addIngredient = () => {
    if (this.state.text.trim() === "") {
      return;
    }
    this.setState(prevState => {
      return {
        Ingredients: prevState.Ingredients.concat(prevState.text),
        text: ""
      }
    })
  }

  // GetRecipe = () => {
  //   var RecipeData = this.state.Ingredients.join(','),
  //     MaladieData = this.state.ValidateMaladie.join(',');
  //   fetch("http://192.168.43.114:3232/api/search/result?ing=" + RecipeData + "&cal=" + this.state.CalNum + "&cook=" + this.state.Time + "100&des=" + MaladieData)
  //     .then(response => response.json())
  //     .then(res => Alert.alert(
  //       'Check Your Network',
  //       JSON.stringify(res)
  //     ))
  //     // .then((res) => res.forEach((item) => {
  //
  //     // }))
  //
  //     .catch((err) => Alert.alert(
  //       'Check Your Network',
  //       JSON.stringify(err)
  //     ));
  //

  GetRecipe = () => {
    var RecipeData = this.state.Ingredients.join(',');
      fetch("http://10.1.255.7:3232/api/search/result?ing="+RecipeData+"&cal=1000&cook=100&des=")
        .then(response => response.json())
        .then(res => {
            let arr = Object.keys(res).map(key => res[key]);
            this.props.navigation.navigate("list", {
              list : arr
          })})

        .catch((err) => Alert.alert(
          'Check Your Network',
          JSON.stringify(err)
        ));
  }

  render() {
    if (this.state.Ingredients && this.state.Ingredients.length > 0) {
      IngredientsItem = (
        <View style={styles.IngCont} >
          {this.state.Ingredients.map((item, index) =>
            <TouchableOpacity key={index} onPress={() => this.DeleteHandler(item)}>
              <View style={styles.IngBloc}  >
                <Text style={styles.MainText} > {item} </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )
    } else {
      IngredientsItem = null;
    }
    const onSelect = (suggestion) => {
      this.setState({
        text: suggestion.text
      });
      this.addIngredient();
    }

    const OnSearchIng = (ing) => {
      this.setState({
        text: ing
      })
      fetch("http://10.1.255.7:3232/api/search?q=" + ing)
        .then(response => response.json())

        .then((res) => res.forEach((item) => {
          this.state.suggestions.push({
            text: item.name
          })
        }))

        .catch((err) => Alert.alert(
          'Check Your Network',
          JSON.stringify(err)
        ));
    }

    const CalScreen = () => {
      this.setState({
        Visible: "Calorie"
      })
    }

    const GoTimeScreen = () => {
      var MaladiesData = [];
      fetch("http://10.1.255.7:3232/api/diseases")
        .then(res => res.json())
        // .then(res => Alert.alert(
        //   'Check Your Network',
        //   JSON.stringify(res.data[0].name)
        // ) )
        .then(res => res.data.forEach(disease => {
          MaladiesData.push(disease.name);
        }))
        .catch(err => Alert.alert(
          'Check Your Network',
          JSON.stringify(err)
        ));
      this.setState({
        Visible: "Time",
        Maladie: MaladiesData
      })
    }
    const GoMaladieScreen = () => {
      this.setState({
        Visible: "Maladie",
      })
    }


    const TimeScreen = (
      <View style={styles.Screencontainer} >
        <TouchableOpacity onPress={GoMaladieScreen} style={styles.SubButtonCont}>
          <Image style={styles.SubmitButton}
            source={require('../assets/Submit.png')}
          />
        </TouchableOpacity>
        <Image style={[styles.ClockImage]}
          source={require('../assets/Clock.png')} resizeMode={'contain'}
        />
        <Text style={styles.description}> Entrez le temps maximale pour préparer le repas </Text>
        <Slider maximumValue={200} minimumValue={10} style={styles.Range}
          onValueChange={(Time) => this.setState({ Time })} step={1} minimumTrackTintColor="#d2d4d8"
          maximumTrackTintColor="#d2d4d8" thumbTintColor="#d2d4d8"

        />
        <Text style={[styles.Number, { color: "#d2d4d8" }]}> {this.state.Time}min </Text>
      </View>

    );

    const CalorieScreen = (
      <View style={styles.Screencontainer} >
        <TouchableOpacity onPress={GoTimeScreen} style={styles.SubButtonCont}>
          <Image style={styles.SubmitButton}
            source={require('../assets/Submit.png')}
          />
        </TouchableOpacity>
        <Image style={[styles.FireImage]}
          source={require('../assets/Calories.png')} resizeMode={'contain'}
        />
        <Text style={styles.description}> Entrez la valeur maximale des calories </Text>
        <Slider maximumValue={2500} minimumValue={100} style={styles.Range}
          onValueChange={(CalNum) => this.setState({ CalNum })} step={1} minimumTrackTintColor="red"
          maximumTrackTintColor="#d2d4d8" thumbTintColor="red"

        />
        <Text style={styles.Number}> {this.state.CalNum} </Text>
      </View>
    );

    const InputScreen = (
      <View style={styles.container}>
        <TouchableOpacity onPress={CalScreen} style={styles.SubButtonCont}>
          <Image style={styles.SubmitButton}
            source={require('../assets/Submit.png')}
          />
        </TouchableOpacity>
        <AutoComplete
          onSelect={onSelect}
          suggestions={this.state.suggestions}
          suggestionObjectTextProperty='text'
          value={this.state.text}
          inputStyle={styles.input}
          onChangeText={(text) => OnSearchIng(text)}
          suggestionTextStyle={styles.suggestionTextStyle}
          underlineColorAndroid="rgba(0,0,0,0)"
          minimumSimilarityScore={0.1}
          suggestionsWrapperStyle={styles.suggestionStyle}
        />
        {IngredientsItem}
      </View>
    )


    const MaladieScreen = (

      <View style={styles.container}>
        <TouchableOpacity onPress={this.GetRecipe} style={styles.SubButtonCont}>
          <Image style={styles.SubmitButton}
            source={require('../assets/Submit.png')}
          />
        </TouchableOpacity>
        <ScrollView
          style={styles.suggestionStyle}>
          {

            this.state.Maladie.map((text, index) => (
              <TouchableOpacity
                key={index}
                suggestionText={text}
                activeOpacity={0.6}
                style={styles.MaladieComponent}
                onPress={() => {
                  this.setState({
                    ValidateMaladie: this.state.ValidateMaladie.concat([text])
                  })
                }}
                underlayColor='black'
              >
                <View style={styles.CheckContainer} >
                <CheckBox value={!(this.state.ValidateMaladie.indexOf(text) === -1)}

/>
                  <Text
                    style={[styles.suggestionTextStyle, { fontSize: 17 }]}
                  >
                    {text}
                  </Text>


                </View>

              </TouchableOpacity>
            ))
          }
        </ScrollView>

      </View>
    )

    /* {CalorieScreen} */
    switch (this.state.Visible) {
      case ("Input"): {
        return [InputScreen]
      }
      case ("Calorie"): {
        return [CalorieScreen]
      }
      case ("Time"): {
        return [TimeScreen]
      }
      case ("Maladie"): {
        return [MaladieScreen]
      }
    }

  }
}

const styles = StyleSheet.create({
  input: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: 250,
    height: 50,
    fontFamily: "Poppins-ExtraLight",
    backgroundColor: "#eee",
  }, MaladieComponent: {
    margin: 0,
    borderBottomWidth: 1,
    borderBottomColor: "black",

  }, CheckContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"

  },
  SubButtonCont: {
    position: "absolute",
    zIndex: 6,
    bottom: 0,
    right: 10,
  }, Screencontainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 320,
    // width : 280
  }, Number: {
    fontSize: 50,
    fontFamily: "Poppins-ExtraLight",
    color: "red"

  },
  description: {
    fontFamily: "Poppins-ExtraLight",
    fontSize: 20,
    color: "#d2d4d8",
    textAlign: "center"
  },
  suggestionTextStyle: {
    fontFamily: "Poppins-ExtraLight",
  }, SubmitButton: {
    width: 60,
    height: 60,
  },
  FireImage: {
    width: 20,
    margin: 0
  }, ClockImage: {
    width: 30,
    margin: 0
  },
  suggestionStyle: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: 250,
    height: 50,
    backgroundColor: "#eee",
    padding: 10,
    zIndex: 3
  },
  MainText: {
    fontFamily: "Poppins-ExtraLight"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // height : 320 ,
    // width : 280
  },
  IngCont: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: Dimensions.get('window').width,
    marginTop: 0,
    flexWrap: "wrap",
    position: "absolute",
    top: 50,
    left: 5,
  },
  IngBloc: {
    backgroundColor: "#e0e1e2",
    borderRadius: 8,
    margin: 5,
    padding: 8,
  },
  Range: {
    width: Dimensions.get('window').width - 20,
  }
});
