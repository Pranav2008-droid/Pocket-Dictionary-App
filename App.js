import * as React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import CreateTitle from './Components/CreateTitle';

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      text: '',
      data: null,
    };
  }  
  retrieveInfo = () =>{
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    var url=`https://whitehat-dictionary.glitch.me/?word=${this.state.text}`;
    fetch(`${proxyurl}${url}`)
    .then((response) => response.json())
    .then((responseJson) =>{
        this.setState({data : JSON.parse(responseJson)});
        console.log(this.state);
      }).catch((error) => {
        console.log("Error while fetching the url")
        console.log(error);
      });
      Speech.speak(this.state.text);
  }
  render(){
    return (
      <View>
        <CreateTitle title="Pocket Dictionary"></CreateTitle>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({ text: text.toLowerCase() });
            }}
            value={this.state.text}
          />      
          <TouchableOpacity 
          onPress={this.retrieveInfo}
          style={styles.button}
          >
            <Text style={styles.buttonText}>Check In Dictionary</Text>
          </TouchableOpacity>
        </View>

        {this.state.data != null ? <Text>Type: {JSON.stringify(this.state.data.results[0].type).replace(/"/g, "")}</Text> : <View/>}
        {this.state.data != null ? <Text>Definition: {JSON.stringify(this.state.data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]).replace(/"/g, "")}</Text> : <View/>}

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    marginLeft : '5%',
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    outline: 'none',
  },
  button: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 50,
    marginLeft : 20,
    width: 200,
    height: 50,
    backgroundColor : 'blue',
  },  
  buttonText : {
    alignSelf : 'center',
    color : 'white',
  },
  inputContainer : {
    flexDirection: 'row',
  }
});
