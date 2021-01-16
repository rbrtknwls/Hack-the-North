import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import UploadScreen from './screens/UploadScreen';
import ResultScreen from './screens/ResultScreen';

import React, { Component } from 'react';

const demo_person = {
  name:"Carlos",
  desc: "parking ticke"
}
class App extends React.Component {
  constructor() {
  super();
  
  this.state ={
    page: 1,
    person: demo_person,
    colorScheme: true
  }

   }

   changetoResult(event){
     this.setState({
       page:2})
     console.log(event)

   }

   changetoUpload(event){
    this.setState({
      page:1, 
      /*person:null*/});

  }

  render() {
    let curr_page;

    if (this.state.page == 1){
      curr_page = <UploadScreen handlePress={this.changetoResult.bind(this)}/>
    } else if (this.state.page ==2){
      curr_page = <ResultScreen handlePress={this.changetoResult.bind(this)}/>
    }
    
    return (
      <SafeAreaProvider>
      {curr_page}
    </SafeAreaProvider>

    );
  }
}

export default App;