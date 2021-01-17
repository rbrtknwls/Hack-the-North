import React, { Component } from 'react'
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import FadeInOut from 'react-native-fade-in-out';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

class UploadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible: true })


        }, 1000);

    }

    render() {
        return (

            <View style={ViewStyle}>
                    <FadeInOut visible={this.state.visible}>
    

                        <Image />
                        <Text style={TextStyle}>{this.props.person.name}</Text>
                        <Text style={TextStyle}>{this.props.person.desc}</Text>
                        <TouchableOpacity style={AgainStyle} title="Upload Again" onPress={this.props.handlePress}>
                            <Text style={ButtonTextStyle}>Upload Another</Text>

                        </TouchableOpacity>
</FadeInOut>

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

const styles = {
    lottie: {
        width: 100,
        height: 100
    }
}
