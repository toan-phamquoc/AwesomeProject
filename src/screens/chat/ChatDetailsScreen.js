import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Icon } from "react-native-elements"
import MyFirebase from '../../services/Firebase';

export default class ChatDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      chatUser: {
        _id: props.navigation.state.params.uid
      },
      messages: null
    };
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    }
  };

  async componentDidMount() {
    const user = MyFirebase.GiftedChatUser;

    user ? this.setState({ currentUser: user }) : this.props.navigation.navigate('Login');

    await MyFirebase.getUserProfile(this.state.chatUser._id).then(user => {
      this.setState({
        chatUser: {
          _id: user.uid,
          name: user.displayName,
          avatar: user.photoURL
        }
      })
    })

    await MyFirebase.getLastMessages(this.state.chatUser._id).then((lastMessages) => {
      lastMessages.map(mes => {
        mes.user.name = this.state.chatUser.name;
        mes.user.avatar = this.state.chatUser.avatar;
      })
      this.setState({ messages: lastMessages });
    });

    // MyFirebase.on((message) => {
    //   console.log('subscribe data', message);
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message),
    //   }))
    // });
  };


  componentWillUnmount() {
    MyFirebase.off();
  }

  onSend(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    MyFirebase.sendMessage(messages, this.state.receiverId);
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages[0])}
        user={this.state.currentUser}
      />
    )
  }
}
