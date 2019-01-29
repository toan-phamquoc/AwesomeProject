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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
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
    const { name, email, password, passwordConfirmation } = this.state;
    console.log('signUp');
    console.log(name);
    console.log(email);
    console.log(password);
    if (password.trim() === "" || email.trim() === "" || password.trim() === "") {
      this.setState({
        errorMessage: "Name, Email and Password required."
      });
      return;
    }

    if (password != passwordConfirmation) {
      this.setState({
        errorMessage: "password not match password confirmation"
      });
      return;
    }

    MyFirebase
      .signUp(this.state.email, this.state.password, this.state.name)
      .then(() => {
        this.setState({ error: "", loading: false });
        this.props.navigation.navigate("Main");
      })
      .catch(error => {
        this.setState({ errorMessage: error.message, loading: false });
      });

    //await AsyncStorage.setItem("email", email);
    //await AsyncStorage.setItem("password", password);
    this.setState({ loading: false });
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
