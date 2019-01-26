import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableHighlight,
  Image,
  KeyboardAvoidingView,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Logo from './components/Logo';
import Form from './components/Form';
import Wallpaper from './components/Wallpaper';
import ButtonSubmit from './components/ButtonSubmit';
import LoginSection from './components/LoginSection';

import MyFirebase from "../../services/Firebase";
import Spinner from "react-native-loading-spinner-overlay";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      errorMessage: "",
      loading: false
    };
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.props.navigation.navigate("Home");
    //     this.setState({
    //       loading: false
    //     });
    //   }
    // });
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    }
  };

  async registerPress() {
    const { email, password } = this.state;
    console.log('signUp');
    console.log(email);
    console.log(password);
    if (email.trim() === "" || password.trim() === "") {
      this.setState({
        errorMessage: "Email and Password required."
      });
    } else {
      console.log('sign up');
      MyFirebase
        .signUp(this.state.email, this.state.password)
        .then(() => {
          this.setState({ error: "", loading: false });
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, loading: false });
        });

      //await AsyncStorage.setItem("email", email);
      //await AsyncStorage.setItem("password", password);
      this.setState({ loading: false });
    }
  }

  logInPress = () => {
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form state={this.state}
          setState={this.setState.bind(this)} />
        <ButtonSubmit onRegisterPress={this.registerPress.bind(this)} />
        <LoginSection onLogInPress={this.logInPress.bind(this)} />
        <Spinner visible={this.state.loading} />
      </Wallpaper>
    );
  }
}

AppRegistry.registerComponent("SignUp", () => SignUp);
