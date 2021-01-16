import React, { Component } from 'react'
import { View, Text, Button} from 'react-native';

class UploadScreen extends Component {
  constructor(props) {
	super(props);
   }


  render() {
    return (
<View>
<Button title="Upload" onPress={this.props.handlePress}/>
<Button title="Take photo"/>
</View>
    
    );
  }
}

export default UploadScreen;