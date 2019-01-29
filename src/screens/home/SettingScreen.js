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
    header: null,
    tabBarIcon: () => <Icon name="user-circle-o" color="black" type="font-awesome" />
  };

  async componentDidMount() {
    const currentUser = await MyFirebase.getCurrentUser();
    this.setState({ currentUser })
  }

  async onSignOutPress() {
    await MyFirebase.signOut()
    this.props.navigation.navigate('Login')
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <List containerStyle={{
            marginBottom: 0,
            marginTop: 0,
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
              onPress={() => this.props.navigation.navigate("EditProfile", { currentUser: this.state.currentUser })}
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
              onPress={() => this.onSignOutPress()}
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

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0
  },
  scrollView: {
    margin: 0,
    padding: 0
  },
})
