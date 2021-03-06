import React, { Component } from "react";
import { Header } from "react-native-elements";
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

class MyHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        rightComponent={{
          icon: "home",
          color: "#fff",
          onPress: () => this.props.navigation.openDrawer()
        }}
      />
    );
  }
}
export default MyHeader;
