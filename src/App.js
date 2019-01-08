import React from "react";
import AppNavigator from "./AppNavigator";
import { createAppContainer } from "react-navigation";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false,
      currentUser: null
    };
  }

  render() {
    return (
      <AppContainer
        ref={nav => {
          this.navigator = nav;
        }}
        // pass data to other screen
        screenProps={{
          currentUser: this.state.currentUser,
          //currentFriends: this.state.currentFriends,
          //possibleFriends: this.state.possibleFriends,
          //addFriend: this.addFriend
        }}
      />
    );
  }
}
// addFriend = (index) => {
//   const {
//     currentFriends,
//     possibleFriends,
//   } = this.state

//   // Pull friend out of possibleFriends
//   const addedFriend = possibleFriends.splice(index, 1)

//   // And put friend in currentFriends
//   currentFriends.push(addedFriend)

//   // Finally, update our app state
//   this.setState({
//     currentFriends,
//     possibleFriends,
//   })
// }
