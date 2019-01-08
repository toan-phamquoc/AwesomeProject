// HomeScreen.js
// https://github.com/Monte9/react-native-elements-app
import React from "react";
import { StyleSheet, Platform, Image, Text, View } from "react-native";
import { Header } from "react-native-elements";
import firebase from "react-native-firebase";
import SideBar from "./SideBar";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false,
      currentUser: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user,
          loading: false,
          authenticated: true
        });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    //const { currentUser } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff", onPress: { SideBar } }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <Text>
          Hi {this.state.currentUser && this.state.currentUser.email}!
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
