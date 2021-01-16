import React, { Component } from 'react'
import { View, Text, Button,Image, TouchableOpacity,} from 'react-native';

class UploadScreen extends Component {
  constructor(props) {
	super(props);
   }


  render() {
    console.log(this.props.image)
    return (
<View style={ViewStyle}>
    <Image source={this.props.image}  style={{ width: 200, height: 200 }}/>
<TouchableOpacity title="Upload" onPress={this.props.getImage} style={UploadStyle}>
<Text>Upload</Text>
</TouchableOpacity>

<TouchableOpacity title="Confirm" onPress={this.props.handlePress} style={ConfirmStyle}>
<Text>Confirm</Text>
</TouchableOpacity>

<TouchableOpacity title="Take photo" style={TakePhotoStyle}>
<Text>Take Photo</Text>
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

const UploadStyle = {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
}


const ConfirmStyle = {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:1,
    marginBottom: 1,
}

const TakePhotoStyle = {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:1,
    marginBottom: 1,
}