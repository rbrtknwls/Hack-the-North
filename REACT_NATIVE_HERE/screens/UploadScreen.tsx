import React, { Component } from 'react'
import { Animated, View, Text, Button, Image, TouchableOpacity, } from 'react-native';
import FadeInOut from 'react-native-fade-in-out';

class UploadScreen extends Component {
    constructor(props) {
            super(props);

        this.state = {
            visible: false,
            imagevisible: false,

        }


    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ imagevisible: true })
            setTimeout(() => { this.setState({ visible: true }) }, 500);

        }, 1000);

    }



    render() {
        let display_photo = (this.props.image != null) ? <Image source={this.props.image} style={{ width: 200, height: 200, marginBottom: 50, marginTop: 25 }} /> : null;
        let textVisible = (this.props.image == null) ? "flex" : "none"

        return (
            <View style={{ ...WrapperStyle }} >


                <FadeInOut visible={this.state.visible}>
                    <View style={{ ...TextWrap, display: textVisible }}>

                        <FadeInOut visible={this.state.imagevisible}>
                            <Animated.Image source={require('../assets/images/bird.png')} style={{ width: 100, height: 100 }} />
                        </FadeInOut>
                        <Text style={Title}>RAVEN</Text>
                        <Text style={Desc}>Find out criminal information of a person from just a photo</Text>
                    </View></FadeInOut>

                {display_photo}

                <FadeInOut visible={this.state.visible}>
                    <View style={row1}>
                        <TouchableOpacity title="Upload" onPress={this.props.getImage} style={UploadStyle}>
                            <Text style={UploadText} >Upload</Text>
                        </TouchableOpacity>

                        <FadeInOut visible={(textVisible == "flex") ? false : true}>
                            <TouchableOpacity title="Confirm" onPress={this.props.handlePress} style={{ ...ConfirmStyle, display: (textVisible == "flex") ? "none" : "flex" }}>
                                <Text style={GoText}> Go</Text>
                            </TouchableOpacity>
                        </FadeInOut>
                    </View>
                    </FadeInOut>

            </View>

        );
    }
}

export default UploadScreen;

const TextWrap = {
    justifyContent: 'center',
    alignItems: 'center',
}

const Title= {
    color:"white",
    fontFamily:"Futura",
    letterSpacing:2,
    fontSize:80,
    fontWeight: 'bold',

}

const Desc = {
    color: "white",
    fontFamily: "Futura",
    fontSize: 16,
    marginBottom: 50,
}
const UploadText = {
    color: "white",
    fontFamily: "Futura",
    letterSpacing: 2,
}

const GoText = {
    color: "white",
    fontFamily: "Futura",
    letterSpacing: 2,
}
const PhotoText = {
    textDecorationLine: 'underline',
    color: "white",
    fontFamily: "Futura",
    letterSpacing: 2,
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
    marginRight: 10,

}


const ConfirmStyle = {
    elevation: 8,
    backgroundColor: "none",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 1,
    marginBottom: 1,
}

const TakePhotoStyle = {
    elevation: 8,
    backgroundColor: "none",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 1,
    marginBottom: 1,
}
