import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class DummyScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Dummy',
    tabBarIcon: ({ tintColor }) => (
      <Image
        //source={require('../../../public/images/ic_knowledge@2x.png')}
        style={[
          tabStyles.icon,
          {
            tintColor,
          },
        ]}
      />
    ),
  };

  render() {
    return (
      <View>
        <Text>Dummy</Text>
      </View>
    );
  }
}

const tabStyles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  filledButton: {
    backgroundColor: 'red',
  },
  filledButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
