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
    <Text>{this.props.person.name}</Text>
    <Text>{this.props.person.desc}</Text>
<TouchableOpacity style={AgainStyle} title="Upload Again">
<Text>Upload Another</Text>
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
}

const AgainStyle = {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
}
