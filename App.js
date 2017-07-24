import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ApplicationRoot from './application';

export default class Root extends Component {
  render() {
    return (
      <View style={styles.container}>     
        <ApplicationRoot />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
