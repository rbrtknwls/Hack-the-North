import React, { Component } from 'react'
import { View, Text, Button, Image, TouchableOpacity,} from 'react-native';

class UploadScreen extends Component {
  constructor(props) {
	super(props);
   }


  render() {
      let display_photo = (this.props.image!=null)  ?  <Image source={this.props.image}  style=
      {{ width: 200, height: 200,marginBottom:50,marginTop:25 }}/>: null;

      let textVisible = (this.props.image==null) ? "flex" : "none"

    console.log(this.props.image)
    return (
        <View style={WrapperStyle}>

            <View style={{... TextWrap, display:textVisible}}>
            <Image source={require('../assets/images/bird.png')} style={{width:100, height:100}}/>
            <Text style={Title}>RAVEN</Text>
    <Text style={Desc}>Find out criminal information of a person from just a photo</Text>
            </View>

            {display_photo}

<View style={row1}>
<TouchableOpacity title="Upload" onPress={this.props.getImage} style={UploadStyle}>
<Text style={UploadText} >Upload</Text>
</TouchableOpacity>

<TouchableOpacity title="Confirm" onPress={this.props.handlePress} style={{... ConfirmStyle, display:"none"}}>
<Text style={GoText}> Go</Text>
</TouchableOpacity>
</View>

<View>
<TouchableOpacity title="Take photo" style={TakePhotoStyle}>
<Text style={PhotoText}>Take Photo</Text>
</TouchableOpacity>
</View>

    );
  }
}

export default UploadScreen;

const TextWrap= {
    justifyContent: 'center',
    alignItems: 'center',
}
const Title={
    color:"white",
    fontFamily:"Futura",
    letterSpacing:2,
    fontSize:80,
    fontWeight:800,

}

const Desc={
    color:"white",
    fontFamily:"Futura",
    fontSize:16,
    marginBottom:50,
}
const UploadText ={
    color:"white",
    fontFamily:"Futura",
    letterSpacing:2,
}

const GoText ={
    color:"white",
    fontFamily:"Futura",
    letterSpacing:2,
}
const PhotoText ={
    textDecorationLine: 'underline',
    color:"white",
    fontFamily:"Futura",
    letterSpacing:2,
}
const WrapperStyle = {
    backgroundColor: "#1C0F40",
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
}

const row1 = {
    flexDirection: 'row',
}

const UploadStyle = {
    elevation: 9,
    backgroundColor: "#FF6E39",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginRight:10,

}


const ConfirmStyle = {
    elevation: 8,
    backgroundColor: "none",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:1,
    marginBottom: 1,
}

const TakePhotoStyle = {
    elevation: 8,
    backgroundColor: "none",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:1,
    marginBottom: 1,
}
