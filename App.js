import * as React from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import CreateTitle from './Components/CreateTitle';
import db from './localdb';

export default class App extends React.Component{
  constructor() {
    super();
    this.state = {
      text: '',
      data: null,
    };
  }  
  retrieveInfo = () =>{
    var dbText = db[this.state.text];
    console.log(dbText);
    this.setState({data : dbText});
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

        {this.state.data != null ? <View style={styles.displayView}><Text style={styles.displaytext}>Definition: </Text><Text>{this.state.data}</Text></View> : <View/>}

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
  displaytext : {
    fontWeight : 'bold',
  },
  inputContainer : {
    flexDirection: 'row',
  },
  displayView : {
    flexDirection : 'row',
  }
});
