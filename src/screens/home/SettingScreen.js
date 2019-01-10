import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    //tabBarLabel: "Profile",
    tabBarLabel: null,
    title: null,
    tabBarIcon: () => <Icon name="user-cog" color="black" />
  };

  render() {
    return (
      <View>
        <Text>Setting page</Text>
      </View>
    );
  }
}

const tabStyles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  filledButton: {
    backgroundColor: "red"
  },
  filledButtonText: {
    color: "white",
    fontWeight: "bold"
  }
});
