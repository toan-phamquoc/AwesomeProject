import React, { Component } from "react";
import { View, Text, Button, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TestService from "../../services/TestService";

// const TestList = ({ items }) => {
//   const listItems = items.map(item => <li>{item.title}</li>);
//   return <ul>{listItems}</ul>;
// };

export default class HomeScreen extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    // Note: By default the icon is only shown on iOS. Search the showIcon option
    // below.
    tabBarIcon: tintColor => <Icon name="home" size={26} color="#900" />
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
