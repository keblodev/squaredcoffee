import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import { Switch } from 'react-router-dom';

import { Route, Link } from 'react-router-native';


import {
  StackNavigator,
} from 'react-navigation';

import Home from './components/home';
import About from './components/about';
import Drinks from './components/drinks';

const AppNav = StackNavigator({
  Home: { screen: Home },
  About: { screen: About },
  Drinks: { screen: Drinks },
});

AppRegistry.registerComponent('SquaredCoffeApp', () => AppNav);

class App extends Component {

	render () {
		return (
			<AppNav
				style = {styles.container}
			/>
		);
	}
}

export default App;

const styles = StyleSheet.create({
  container: {
		width: '100%'
  }
})
