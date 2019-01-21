
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput
} from 'react-native';
import { Icon } from "react-native-elements"
const repeatPasswordImg = require('../images/repeat.png');
const usernameImg = require('../images/username.png');
const passwordImg = require('../images/password.png');
const eyeImg = require('../images/eye_black.png');

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
    };
    this.showPass = this.showPass.bind(this);
  }

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputWrapper}>
          <Image source={usernameImg} style={styles.inlineImg} />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image source={passwordImg} style={styles.inlineImg} />
          <TextInput
            style={styles.inputText}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image source={repeatPasswordImg} style={styles.inlineImg} />
          <TextInput
            style={styles.inputText}
            secureTextEntry={this.state.showPass}
            placeholder="Repeat Password"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 60,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    width: 22,
    height: 22,
    left: 35,
    top: 9,
  },
  inputWrapper: {
    flex: 1,
  },
});
