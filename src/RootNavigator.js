import { createStackNavigator } from "react-navigation";

// import the different screens
import SignUpScreen from "./screens/signup/SignUpScreen";
import LoginScreen from "./screens/login/LoginScreen";
import LoginWithPhoneScreen from "./screens/login/LoginPhoneScreen";
import { MyDrawerScreen, MyTabScreen } from "./navigation";

const RootNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Log In",
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: "Sign Up",
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        header: null
      }
    },
    Main: {
      screen: MyTabScreen,
      navigationOptions: {
        title: null,
        header: null
      }
    },
    Drawer: {
      screen: MyDrawerScreen,
      navigationOptions: {
        title: "Unicorn",
        header: null
      }
    },
    LoginByPhone: {
      screen: LoginWithPhoneScreen,
      navigationOptions: {
        title: "Log In",
        headerStyle: {
          backgroundColor: "#16a085",
          elevation: null
        },
        header: null
      }
    },
  },
  {
    initialRouteName: "Login"
  }
);

export default RootNavigator;

