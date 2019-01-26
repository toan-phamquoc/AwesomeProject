import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import {
  Header,
  Avatar,
  List,
  ListItem,
  Icon,
  SearchBar
} from "react-native-elements";
import testService from "../../services/TestService";
import MyFirebase from "../../services/Firebase";

export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      stringKey: "",
      showLoadingIcon: false,
      friendListFilted: [],
      friendList: []
    };
  }
  async componentDidMount() {
    const allUser = await MyFirebase.getAllUser();
    this.setState({ friendListFilted: allUser, friendList: allUser });
  }

  static navigationOptions = {
    tabBarLabel: null,
    title: null,
    tabBarIcon: () => <Icon name="users" color="black" type="entypo" />
  };

  searchFriends(stringKey) {
    this.setState({ showLoadingIcon: true, stringKey: stringKey });
    this.timeout = setTimeout(() => {
      const newData = this.state.friendList.filter(item => {
        const itemData = `${item.name.title.toUpperCase()}   
        ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
        const textData = stringKey.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({ friendListFilted: newData, showLoadingIcon: false });
    }, 1000);
  }
  onItemPress(uid) {

  }
  render() {
    return (
      < View >
        <SearchBar
          round={true}
          showLoadingIcon={this.state.showLoadingIcon}
          searchIcon={{ size: 24 }}
          clearIcon
          platform="android"
          value={this.state.stringKey}
          placeholder="Type Here..."
          onChangeText={stringKey => this.searchFriends(stringKey)}
        />
        <ScrollView>
          <List
            containerStyle={{
              marginBottom: 20
            }}
          >
            {this.state.friendListFilted.map((l, i) => (
              <ListItem
                onPress={() => { alert(`click ${l.displayName}`) }}
                containerStyle={{
                  marginBottom: 0,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderBottomColor: "white"
                }}
                roundAvatar
                avatar={{ uri: l.photoUrl }}
                key={i}
                title={l.displayName}
                //subtitle={l.name.last}
                hideChevron={true}
                badge={{
                  value: 3,
                  textStyle: { color: "orange" },
                  containerStyle: { marginTop: 0 }
                }}
              />
            ))
            }
          </List>
        </ScrollView>
      </View >
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
