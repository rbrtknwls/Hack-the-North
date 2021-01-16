import React, { Component } from 'react'
import { View, Text, Button, Image} from 'react-native';

class UploadScreen extends Component {
  constructor(props)) {
	super(props);
   }


  render() {
    return (
<View>
    <Image/>
    <Text>{this.props.person.name}</Text>
    <Text>{this.props.person.desc}</Text>
<Button title="OKDSKOKSODKSD"/>
</View>
    
    );
  }
}

export default UploadScreen;