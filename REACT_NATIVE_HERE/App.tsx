
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import UploadScreen from './screens/UploadScreen';
import ResultScreen from './screens/ResultScreen';

import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

const demo_person = {
  name:"Waiting . . ",
  desc: "",
  photo1: "download.png",
  photo2: "download.png"
}

const s3 = new AWS.S3({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIAYBAQPRKCUPCFBZPC",
 	  secretAccessKey: "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"
  }
});

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

   async changetoResult(event) {

       var imgdata = this.state.image;
         fetch('https://fast-fortress-11497.herokuapp.com/post', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             productImage: this.state.image.slice(22)
           })
         }).then((response)=>response.json())
         .then((responsedata) => {console.log(reponsedata)})
         .catch(console.log)

       //fetch('https://fast-fortress-11497.herokuapp.com/').then((response) => console.log(response)).catch(console.log)
       this.setState({
         page:2,
         person:{
           name:"Waiting . . .",
           desc: "",
           photo1: imgdata,
           photo2: "download.png"
         }

         /*person:null*/});
       await setTimeout(() => { fetch('https://fast-fortress-11497.herokuapp.com/').then((response) => response.json())
       .then((json) => {
         console.log(json.fileName);
         var p2 = json.fileName
         this.setState({
            person:{
              photo1: imgdata,
              photo2: p2,
              name: "yee",
              desc: "AHH"
            }
          })
          fetch('https://crimedatabase.s3.us-east-2.amazonaws.com/'+json.fileName.split('.')[0] +'.json')
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          this.setState({
             person:{
               photo1: imgdata,
               photo2: p2,
               name: json.Name,
               desc: json.description
             }
           })
        })
        .catch((error) => {
          console.error(error);
        });


       })
       .catch((error) => {
         console.error(error);
       });
     }, 10000)



   }

  changetoUpload(event){
    this.setState({
      page:1,
      image:null,
      /*person:null*/});


  }


  async getImage(){

    if (ImagePicker.getMediaLibraryPermissionsAsync()){
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result.uri);



    if (!result.cancelled) {

      let person = demo_person;
      /***** FIND MATCH FUNCTION HERE replace demo_person*/

      this.setState({
        image:result.uri,
        person:person,
      });
    }
  }


  }

  async takeImage(){

    console.log(ImagePicker.getCameraPermissionsAsync()+"f")

        if (ImagePicker.getCameraPermissionsAsync()){
        let result = await ImagePicker.launchCameraAsync()

        if (!result.cancelled) {

          let person = demo_person;
          /***** FIND MATCH FUNCTION HERE replace demo_person*/

          this.setState({
            image:result.uri,
            person:person});
        }
      }


      }

  render() {
    let curr_page;

    if (this.state.page == 1){

      curr_page = <UploadScreen image={this.state.image} getImage ={this.getImage.bind(this)} handlePress={this.changetoResult.bind(this)}
      takeImage={this.takeImage.bind(this)}/>
    } else if (this.state.page ==2){
      curr_page = <ResultScreen person={this.state.person} handlePress={this.changetoUpload.bind(this)} />
    }

    return (
      <SafeAreaProvider>
      {curr_page}
    </SafeAreaProvider>

    );
  }
}

export default App;
