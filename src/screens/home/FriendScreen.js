import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { Avatar, List, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          name: "Amy Farha",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          subtitle: "Vice President"
        },
        {
          name: "Chris Jackson",
          avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
          subtitle: "Vice Chairman"
        }
      ]
    };
  }

  static navigationOptions = {
    //tabBarLabel: "Profile",
    tabBarLabel: null,
    title: null,
    tabBarIcon: () => <Icon name="user-friends" color="black" />
  };

  render() {
    return (
      <View>
        <Text>Friend page</Text>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.list.map(l => (
            <ListItem
              roundAvatar
              avatar={{ uri: l.avatar_url }}
              key={l.name}
              title={l.name}
              subtitle={l.subtitle}
              //onPress={alert("click")}
            />
          ))}
        </List>
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
