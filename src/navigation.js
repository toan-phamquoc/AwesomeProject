import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {
  DrawerNavigator,
  TabNavigator,
  createBottomTabNavigator,
  createTabNavigator,
  createNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import MenuScreen from './screens/menu/MenuScreen';
import HomeScreen from './screens/home/HomeScreen';
import FriendScreen from './screens/home/FriendScreen';
import ChatListScreen from './screens/chat/ChatListScreen';
import SettingScreen from './screens/home/SettingScreen';
import ChatDetailsScreen from './screens/chat/ChatDetailsScreen'
import EditProfileScreen from './screens/profile/EditProfileScreen';

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

export const MySettingStackScreen = createStackNavigator(
  {
    Setting: {
      screen: SettingScreen
    },
    EditProfile: {
      screen: EditProfileScreen
    }
  }
);

export const MyChatStackScreen = createStackNavigator(
  {
    Chat: {
      screen: ChatListScreen
    },
    ChatDetails: {
      screen: ChatDetailsScreen
    }
  }
);

export const MyDrawerScreen = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Notifications: {
      screen: MyNotificationsScreen
    },
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
      screen: MyChatStackScreen,
      navigationOptions: {
        tabBarLabel: null,
        title: null,
        header: null,
        tabBarIcon: () => <Icon name="message" color="black" type="material-community" />
      }
    },
    Setting: {
      screen: MySettingStackScreen,
      navigationOptions: {
        tabBarLabel: null,
        title: null,
        header: null,
        tabBarIcon: () => <Icon name='user' color='black' type='entypo' />
      }
    },
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
