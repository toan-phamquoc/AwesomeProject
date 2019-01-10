import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import styles from './styles';

export default class SettingScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: 'http://www.whatnetworth.com/wp-content/uploads/2017/08/jessica-henwick.jpg',
            }}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 16 }}>
            <Text style={styles.name}>Jessica Henwick</Text>
            <Text>Agent</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
