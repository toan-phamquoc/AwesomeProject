import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {
  DrawerNavigator,
  TabNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import MenuScreen from './screens/menu/MenuScreen';
import HomeScreen from './screens/home/HomeScreen';
import FriendScreen from './screens/home/FriendScreen';
import SettingScreen from './screens/home/SettingScreen';
import ChatScreen from './screens/chat/ChatScreen'
class MyHomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: "Home",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../public/images/ic_home.png")}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate("Notifications")}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: "Notifications",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require("../public/images/ic_home.png")}
        style={[styles.icon, { tintColor }]}
      />
    )
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.openDrawer()}
          title="Go Menu"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go back home"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24
  },
  container: {
    flex: 1
  }
});

export const MyDrawerScreen = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Notifications: {
      screen: MyNotificationsScreen
    }
  },
  {
    contentComponent: MenuScreen,
    drawerWidth: 250,
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle"
  }
);

export const MyTabScreen = createMaterialTopTabNavigator(
  {
    Main: {
      screen: HomeScreen
    },
    Friend: {
      screen: FriendScreen
    },
    Chat: {
      screen: ChatScreen
    },
    Setting: {
      screen: SettingScreen
    }
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#ffffff",
      inactiveTintColor: "#ffffff",
      showIcon: true,
      showLabel: false,
      // labelStyle: {
      //   fontSize: 22,
      //   padding: 5
      // },
      tabStyle: {
      },
      style: {
        backgroundColor: "#ffffff"
      }
    }
  }
);
