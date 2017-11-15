import React, { Component } from 'react';
import { StyleSheet, Text, View, NativeModules } from 'react-native';

import ApplicationRoot from './application';

import SplashScreen from "rn-splash-screen";

export default class Root extends Component {

  constructor(props) {
      super(props);

      this.state = {
          loaded: true
      }
  }

  componentWillMount() {
    // this.setState({
    //     loaded: true
    // })

    // setTimeout(()=>{
    //     // TODO: Fetch all images
    //     this.setState({
    //         loaded:true
    //     })
    // }, 1000);
  }

  render() {
    // TODO
    SplashScreen.hide();
    return (
      <View style={styles.container}>
        {
            this.state.loaded ?
            <ApplicationRoot /> : <Text style={styles.text}>Well Hello!</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 	'#1f232b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 		'white',
    textAlign: 	'center',
  },
});
