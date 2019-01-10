import React, { Component } from "react";
import { View, Text, Button, Image, FlatList } from "react-native";
import {Icon} from "react-native-elements"
import TestService from "../../services/TestService";
import MyHeader from "../partials/header";
export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: null,
    title: null,
    tabBarIcon: () => <Icon name="home" color="black" type="font-awesome" />
  };

  constructor(props) {
    super(props);

    this.state = { testItems: [] };
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.onButtonPress.bind(this)}
          title="Get data from somewhere"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <FlatList
          data={this.state.testItems}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
        <Button
          onPress={() => this.props.navigation.navigate("Notifications")}
          title="Go to notifications"
        />
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Open Menu"
        />
      </View>
    );
  }

  onButtonPress() {
    const service = new TestService();
    service.demoGet(response => {
      console.log(`response: ${response}`);
      this.setState({ testItems: response.data });
    });
  }
}
