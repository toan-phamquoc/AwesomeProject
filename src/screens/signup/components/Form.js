
import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TextInput,
  Text
} from 'react-native';
import { Icon } from "react-native-elements"
const repeatPasswordImg = require('../images/repeat.png');
const usernameImg = require('../images/username.png');
const passwordImg = require('../images/password.png');
const personImg = require('../images/person.png');
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
        <View>
          <Text style={{ color: "red" }}> {this.props.state.errorMessage} </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Image source={personImg} style={styles.inlineImg} />
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
            value={this.props.state.name}
            onChangeText={name => this.props.setState({ name })}
          />
        </View>
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
            value={this.props.state.email}
            onChangeText={email => this.props.setState({ email })}
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
            value={this.props.state.password}
            onChangeText={password => this.props.setState({ password })}
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
            value={this.props.state.passwordConfirmation}
            onChangeText={passwordConfirmation => this.props.setState({ passwordConfirmation })}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
        </View>

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
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnEye: {
    position: 'absolute',
    top: 90,
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
    height: 70,
    marginVertical: 10
  },
});
