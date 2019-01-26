import React, { Component } from "react";
import {
  AppRegistry,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StatusBar,
  TextInput,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from "react-native";
import Logo from './components/Logo';
import Form from './components/Form';
import Wallpaper from './components/Wallpaper';
import ButtonSubmit from './components/ButtonSubmit';
import SignupSection from './components/SignUpSection';
import { StackNavigator } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import MyFirebase from "../../services/Firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ttoan1@gmail.com",
      password: "123456",
      loading: false,
      errorMessage: ""
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

  async componentDidMount() {
    //var email = await AsyncStorage.getItem("email");
    //var password = await AsyncStorage.getItem("password");
    // this.setState({
    //   email,
    //   password
    // });
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };

  async loginPress() {
    this.setState({ errorMessage: "", loading: true });
    const { email, password } = this.state;
    console.log("onLogin>>>>", email, password);
    //await AsyncStorage.setItem("email", email);
    //await AsyncStorage.setItem("password", password);
    console.log("onLogin", email, password);
    if (email.trim() === "" || password.trim() === "") {
      this.setState({
        errorMessage: "Email and Password required.",
        loading: false
      });
    } else {
      MyFirebase
        .signIn(this.state.email, this.state.password)
        .then(() => {
          this.setState({ errorMessage: "", loading: false });
          console.log("Drawer");
          this.props.navigation.navigate("Main");
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, loading: false });
        });
    }
  }

  signUpPress = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form state={this.state}
          setState={this.setState.bind(this)}
        />
        <ButtonSubmit onLoginPress={this.loginPress.bind(this)} />
        <SignupSection onSignUpPress={this.signUpPress.bind(this)} />
        <Spinner visible={this.state.loading} />
      </Wallpaper>
    );
  }
}

AppRegistry.registerComponent("Login", () => Login);
