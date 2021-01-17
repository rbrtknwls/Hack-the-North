import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import UploadScreen from './screens/UploadScreen';
import ResultScreen from './screens/ResultScreen';

import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';

const demo_person = {
  name:"Carlos",
  desc: "parking ticket haha"
}
class App extends React.Component {
  constructor() {
  super();
  
  this.state ={ 
    page: 1,
    image:null,
    person: demo_person,
    colorScheme: true
  };

   }

   changetoResult(event){
    this.setState({
      page:2
      /*person:null*/});
  

  }

  async getImage(){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {

      let person = demo_person;
      /***** FIND MATCH FUNCTION HERE replace demo_person*/

      this.setState({
        image:result.uri,
        person:person});
    }


  }

   changetoUpload(event){
    this.setState({
      page:1, 
      /*person:null*/});

  }

  render() {
    let curr_page;

    if (this.state.page == 1){
      
      curr_page = <UploadScreen image={this.state.image} getImage ={this.getImage.bind(this)} handlePress={this.changetoResult.bind(this)}/>
    } else if (this.state.page ==2){
      curr_page = <ResultScreen person={this.state.person} handlePress={this.changetoResult.bind(this)}/>
    }
    
    return (
      <SafeAreaProvider>
      {curr_page}
    </SafeAreaProvider>

    );
  }
}

export default App;