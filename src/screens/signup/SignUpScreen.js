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
import SignupSection from './components/SignUpSection';

import firebase from "react-native-firebase";
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

  async onRegisterPress() {
    //this.setState({ error: "", loading: true });
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    if (email.trim() === "" || password.trim() === "") {
      this.setState({
        errorMessage: "Email and Password required."
      });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ error: "", loading: false });
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          this.setState({ errorMessage: error.message, loading: false });
        });

      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form />
        {/*
        <ButtonSubmit /> */}
      </Wallpaper>
      <Spinner visible={this.state.loading} />
      // <View behavior="padding" style={styles.container}>
      //   <StatusBar barStyle="light-content" backgroundColor="#16a085" />
      //   <View style={styles.logoContainer}>
      //     <Image style={styles.logo} source={require("../../../public/images/logo.png")} />
      //     <Text style={styles.subtext}>Sign Up</Text>
      //   </View>
      //   <KeyboardAvoidingView>
      //     <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
      //     <TextInput
      //       value={this.state.email}
      //       onChangeText={email => this.setState({ email })}
      //       style={styles.input}
      //       placeholderTextColor="rgba(255,255,255,0.7)"
      //       returnKeyType="next"
      //       ref={input => (this.emailInput = input)}
      //       onSubmitEditing={() => this.passwordCInput.focus()}
      //       keyboardType="email-address"
      //       autoCapitalize="none"
      //       autoCorrect={false}
      //       placeholder="Email"
      //     />
      //     <TextInput
      //       value={this.state.password}
      //       onChangeText={password => this.setState({ password })}
      //       style={styles.input}
      //       placeholder="Password"
      //       secureTextEntry={true}
      //       placeholderTextColor="rgba(255,255,255,0.7)"
      //       ref={input => (this.passwordCInput = input)}
      //       onSubmitEditing={() => this.passwordInput.focus()}
      //       returnKeyType="next"
      //       secureTextEntry
      //     />
      //     <TextInput
      //       value={this.state.password}
      //       onChangeText={password_confirmation =>
      //         this.setState({ password_confirmation })
      //       }
      //       style={styles.input}
      //       placeholder="Confirm Password"
      //       secureTextEntry={true}
      //       placeholderTextColor="rgba(255,255,255,0.7)"
      //       returnKeyType="go"
      //       secureTextEntry
      //       ref={input => (this.passwordInput = input)}
      //     />
      //   </KeyboardAvoidingView>
      //   <TouchableHighlight
      //     onPress={this.onRegisterPress.bind(this)}
      //     style={styles.button}
      //   >
      //     <Text style={styles.buttonText}>Register</Text>
      //   </TouchableHighlight>
      //   <TouchableOpacity style={styles.button}>
      //     <Text
      //       style={styles.buttonText}
      //       onPress={() => this.props.navigation.navigate("Login")}
      //       title="Login"
      //     >
      //       Log In
      //     </Text>
      //   </TouchableOpacity>
      //   <Text style={styles.errorTextStyle}>{this.state.error}</Text>
      //   <Spinner visible={this.state.loading} />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#16a085",
    padding: 20,
    paddingTop: 10
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200
  },
  input: {
    height: 40,
    width: 350,
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  button: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "stretch",
    marginTop: 10,
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  subtext: {
    color: "#ffffff",
    width: 160,
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 20
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});

AppRegistry.registerComponent("SignUp", () => SignUp);
