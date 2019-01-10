import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ["Item 1", "Item 2", "Item 3"],
      profile: {
        avatarUrl:
          "http://www.whatnetworth.com/wp-content/uploads/2017/08/jessica-henwick.jpg",
        name: "Jessica Henwick",
        position: "Agent"
      }
    };
  }

  onItemPress(value, number) {
    alert(value);
  }

  onSignOutButtonPress() {
    this.props.navigation.navigate("Login");
  }

  getItemView(value, number) {
    return (
      <TouchableOpacity
        key={number}
        style={styles.itemContainer}
        onPress={() => this.onItemPress(value, number)}
      >
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  }

  onAvatarPress() {
    this.props.navigation.navigate("Setting");
  }

  render() {
    return (
      <View>
        <View style={styles.profile}>
          <TouchableOpacity onPress={this.onAvatarPress.bind(this)}>
            <Image
              source={{
                uri: this.state.profile.avatarUrl,
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.name}>{this.state.profile.name}</Text>
          <Text>{this.state.profile.position}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.onSignOutButtonPress.bind(this)}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View>{this.state.data.map(this.getItemView.bind(this))}</View>
      </View>
    );
  }
}
