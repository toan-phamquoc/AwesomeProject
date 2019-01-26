import React, { Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Avatar, List, ListItem, Icon } from "react-native-elements";
import MyFirebase from '../../services/Firebase';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }
  static navigationOptions = {
    //tabBarLabel: "Profile",
    tabBarLabel: null,
    title: null,
    tabBarIcon: () => <Icon name="user-circle-o" color="black" type="font-awesome" />
  };

  async componentDidMount() {
    const currentUser = await MyFirebase.getCurrentUser();
    this.setState({ currentUser })
  }

  render() {
    return (
      <View>
        <ScrollView>
          <List containerStyle={{
            marginBottom: 0,
          }}>
            <ListItem
              containerStyle={{
                height: 50,
                borderBottomColor: "white"
              }}
              roundAvatar
              avatar={this.state.currentUser ? this.state.currentUser.photoURL : null}
              title={this.state.currentUser ? this.state.currentUser.displayName : null}
              hideChevron={true}
              onPress={() => alert('Edit Profile')}
            />
            <ListItem
              containerStyle={{
                height: 50,
                marginLeft: 8,
                borderBottomColor: "white"
              }}
              leftIcon={< Icon name="sign-out" color="black" type="font-awesome" />}
              title={"LogOut"}
              titleStyle={{ marginLeft: 12 }}
              hideChevron={true}
              onPress={() => alert('Log Out')}
            />
            <ListItem
              containerStyle={{
                height: 50,
                marginLeft: 8,
                borderBottomColor: "white"
              }}
              leftIcon={< Icon name="settings" color="black" type="material" />}
              title={"Setting"}
              titleStyle={{ marginLeft: 12 }}
              hideChevron={true}
              onPress={() => alert('Setting')}
            />
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
const styles = StyleSheet.create({
  container: {
    paddingTop: 16
  },
  itemContainer: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#F8F8FF',
    padding: 8
  },
  signOutText: {
  },
  icon: {
    width: 26,
    height: 26,
    flexDirection: 'row',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    padding: 16,
    backgroundColor: '#F8F8FF'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  name: {
    fontSize: 20
  }
})