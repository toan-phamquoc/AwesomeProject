// // Login.js
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Button,
//   AsyncStorage
// } from "react-native";
// import firebase from "react-native-firebase";

// export default class LoginScreen extends React.Component {
//   state = {
//     email: "",
//     password: "",
//     errorMessage: null
//   };
//   handleLogin = () => {
//     const { email, password } = this.state;

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(loggedUser => {
//         AsyncStorage.setItem('@app:session', loggedUser.user.token);
//         this.props.navigation.navigate("Home", {
//           currentUser: loggedUser.user
//         });
//       })
//       .catch(error =>
//         this.setState({
//           errorMessage: error.message
//         })
//       );
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text> Login </Text>
//         {this.state.errorMessage && (
//           <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
//         )}
//         <TextInput
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Email"
//           onChangeText={email => this.setState({ email })}
//           value={this.state.email}
//         />

//         <TextInput
//           secureTextEntry
//           style={styles.textInput}
//           autoCapitalize="none"
//           placeholder="Password"
//           onChangeText={password => this.setState({ password })}
//           value={this.state.password}
//         />
//         <Button title="Login" onPress={this.handleLogin.bind(this)} />
//         <Button
//           title="Don't have an account? Sign Up"
//           onPress={() => this.props.navigation.navigate("SignUp")}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   textInput: {
//     height: 40,
//     width: "90%",
//     borderColor: "gray",
//     borderWidth: 1,
//     marginTop: 8
//   }
// });

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

import { StackNavigator } from "react-navigation";
import Spinner from "react-native-loading-spinner-overlay";
import firebase from "react-native-firebase";

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
    var email = await AsyncStorage.getItem("email");
    var password = await AsyncStorage.getItem("password");
    this.setState({
      email,
      password
    });
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };

  async onLoginPress() {
    this.setState({ errorMessage: "", loading: true });
    const { email, password } = this.state;
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    console.log("onLogin");
    if (email.trim() === "" || password.trim() === "") {
      this.setState({
        errorMessage: "Email and Password required.",
        loading: false
      });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
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
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#16a085" />
        <View behavior="padding" style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../../public//images/logo.png")}
            />
            <Text style={styles.subtext}>Humdum</Text>
          </View>

          <KeyboardAvoidingView style={styles.keyboard}>
            <Text style={{ color: "red" }}> {this.state.errorMessage} </Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="next"
              onSubmitEditing={() => this.passwordInput.focus()}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="rgba(255,255,255,0.7)"
              returnKeyType="go"
              secureTextEntry
              ref={input => (this.passwordInput = input)}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onLoginPress.bind(this)}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("SignUp")}
            title="Sign up"
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("ForgetPassword")}
            title="Forget Password"
          >
            Forget Password
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16a085"
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
  subtext: {
    color: "#ffffff",
    marginTop: 10,
    width: 160,
    textAlign: "center",
    opacity: 0.8
  },
  keyboard: {
    margin: 20,
    padding: 20,
    alignSelf: "stretch"
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 15
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  }
});

AppRegistry.registerComponent("Login", () => Login);
