import React, { Component } from 'react'
import { View, Text, Button, Image,TouchableOpacity} from 'react-native';

class UploadScreen extends Component {
  constructor(props) {
	super(props);
   }


  render() {
    return (
<View style={ViewStyle}>
    <Image/>
    <Text style = {TextStyle}>{this.props.person.name}</Text>
    <Text style = {TextStyle}>{this.props.person.desc}</Text>
<TouchableOpacity style={AgainStyle} title="Upload Again" >
<Text style= {ButtonTextStyle}>Upload Another</Text>
</TouchableOpacity>
</View>

    );
  }
}

export default UploadScreen;

const ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1C0F40'
}

const AgainStyle = {
    elevation: 8,
    backgroundColor: "#FF6E39",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
}

const TextStyle = {
  color: 'white',
  fontSize: 25
}

const ButtonTextStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 15
}
