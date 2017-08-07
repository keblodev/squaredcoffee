import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Button from 'react-native-button';

import { StackNavigator, DrawerButton } from 'react-navigation';

import Home from '../components/home';
import About from '../components/about';
import Drinks from '../components/drinks';
import Checkout from '../components/checkout';
import StoreSelect from '../components/storeselect'

import styles from '../statics/styles';

export const MainCardNavigator = StackNavigator({
	StoreSelect: {
		screen: StoreSelect,
		navigationOptions: {
			header: null
		}
	},
  	Home: {
		screen: Home,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#2A2F3A',
				//TODO: this not really working
				elevation: 0,       //remove shadow on Android
				shadowOpacity: 0,   //remove shadow on iOS
			}
		}
	},
	About: {
		screen: About,
		navigationOptions: {
			title: 'About',
		}
	},
	Drinks: {
		screen: Drinks,
		navigationOptions: {
			title: 'Coffee and stuff',
		}
	}
},{
	navigationOptions: {
        headerStyle: {
			backgroundColor: '#2A2F3A',
			//TODO: this not really working
			elevation: 0,       //remove shadow on Android
			shadowOpacity: 0,   //remove shadow on iOS
		},
		headerTintColor: '#8393b1',
	}
});


export default StackNavigator({
	MainCardNavigator: { screen: MainCardNavigator },

	Checkout: {
		screen: Checkout,
		navigationOptions: {
			title: 'Checkout',

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						height: 			40,
						//TODO: to be removed this whole thing
						flex: 				0.08,
						justifyContent: 	'center',
					}}
				><Button
				style={{
					color: '#8393b1'
				}}
				onPress={()=>{
					navigation.goBack();
				}}
				>back</Button></View>
			)
		}
	}
},{
	mode: 'modal',
	initialRouteName:'MainCardNavigator',
	navigationOptions: {
        headerStyle: {
			display: 'none',
			backgroundColor: '#2A2F3A',
		},
		headerTintColor: '#8393b1',
	}
}
);
