import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {
  DrawerNavigator,
  TabNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";

import MenuScreen from "./screens/menu/MenuScreen";
import HomeScreen from "./screens/home/HomeScreen";
import DummyScreen from "./screens/home/DummyScreen";

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
      screen: MyDrawerScreen,
      navigationOptions: {
        title: "Main",
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        header: null
      }
    },
    Dummy: {
      screen: DummyScreen
    },
    Dummy2: {
      screen: DummyScreen
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#e91e63",
      showIcon: true
    },
    swipeEnabled: true,
    activeTintColor: "#e58f19",
    activeBackgroundColor: "#a9c3d2",
    inactiveTintColor: "#666",
    labelStyle: {
      fontSize: 22,
      padding: 12
    }
  }
);
