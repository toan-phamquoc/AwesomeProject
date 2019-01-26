import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import MyFirebase from '../../services/Firebase';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      receiverId: 'QxOVHNPzx0WyW05D1KLJWc4u9aa1',
      messages: null
    };
  };

  componentDidMount() {
    const user = MyFirebase.GiftedChatUser;

    user ? this.setState({ currentUser: user }) : this.props.navigation.navigate('Login');

    MyFirebase.getLastMessages(this.state.receiverId).then((lastMessages) => {
      this.setState({ messages: lastMessages });
    });
    //console.log('last messages>>>>', lastMessages);



    // MyFirebase.on((message) => {
    //   console.log('subscribe data', message);
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message),
    //   }))
    // });
  };


  componentWillUnmount() {
    //MyFirebase.off();
  }

  onSend(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    MyFirebase.sendMessage(messages, this.state.receiverId);
  };

  // Fire.on(message =>
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, message),
  //   }))
  // );

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
