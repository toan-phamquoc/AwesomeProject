import { createStackNavigator } from "react-navigation";

// import the different screens
import LoadingScreen from "./AuthenciationScreen/Loading";
import SignUpScreen from "./AuthenciationScreen/SignUp";
import LoginScreen from "./AuthenciationScreen/Login";
import HomeScreen from "./HomeScreen/Home";

const AppNavigator = createStackNavigator({
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
  Loading: { screen: LoadingScreen },
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
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home",
      headerStyle: {
        backgroundColor: "#16a085",
        elevation: null
      },
      header: null
      // headerLeft: null,
    }
  }
});

export default AppNavigator;
