import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Header, Avatar, List, ListItem, Icon, SearchBar } from "react-native-elements";

export default class FriendScreen extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
    this.state = {
      showLoadingIcon: false,
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
    tabBarIcon: () => <Icon name="users" color="black" type="entypo" />
  };

  searchFriends(stringKey) {
    this.setState({ showLoadingIcon: true })
    console.log("search friend show loading true>>>", this.state.showLoadingIcon);
    this.timeout = setTimeout(() => {
      //search function
      console.log("search friend>>>", stringKey);
    }, 1000)
    this.setState({ showLoadingIcon: false })
    console.log("search friend show loading>>>", this.state.showLoadingIcon);
  }
  render() {
    return (
      <View>
        <SearchBar
          round={true}
          showLoadingIcon={this.state.showLoadingIcon}
          searchIcon={{ size: 24 }}
          platform="android"
          cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          placeholder='Type Here...'
          onChangeText={stringKey => this.searchFriends(stringKey)}
        />
        <ScrollView>
          <List containerStyle={{
            marginBottom: 20
          }}>
            {this.state.list.map(l => (
              <ListItem
                containerStyle={{
                  marginBottom: 0, borderTopWidth: 0,
                  borderBottomWidth: 0,
                  borderBottomColor: "white"
                }}
                roundAvatar
                avatar={{ uri: l.avatar_url }}
                key={l.name}
                title={l.name}
                subtitle={l.subtitle}
                hideChevron={true}
                badge={{
                  value: 3,
                  textStyle: { color: 'orange' },
                  containerStyle: { marginTop: 0 }
                }}
              //onPress={alert("click")}
              />
            ))}
          </List>
        </ScrollView>
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
