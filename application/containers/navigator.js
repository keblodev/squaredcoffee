import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Button from 'react-native-button';

import { StackNavigator, DrawerButton } from 'react-navigation';

import Home from '../components/home';
import About from '../components/about';
import Drinks from '../components/drinks';
import Drink from '../components/drinks/drink';
import Checkout from '../components/checkout';
import StoreSelect from '../components/storeselect'

import User from '../components/user';
import Account from '../components/user/account';
import PaymentMethods from '../components/user/paymentmethods';

import Login from '../components/login';

import styles from '../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const backIcon = (<AwesomeIcon name="chevron-up" size={20} color="grey" />)

const BackButton= ({navigation}) => (<Button
					style={{
						flex: 1,
					}}
					onPress={()=>{
						navigation.goBack();
					}}
				>
					<View
						style={{
							alignSelf: 'center',
						}}
					>
						{backIcon}
					</View>
				</Button>
)

export const MainCardNavigator = StackNavigator({
	User: {
		screen: User,
		navigationOptions: {
			// header: null
			title: 'Account Info'
		}
	},

	Account: {
		screen: Account,
		navigationOptions: {
			title: 'Account information'
		}
	},

	PaymentMethods: {
		screen: PaymentMethods,
		navigationOptions: {
			title: 'Payment Methods'
		}
	},

	StoreSelect: {
		screen: StoreSelect,
		navigationOptions: {
			// header: null
			title: 'Select a store'
		}
	},
  	Home: {
		screen: Home,
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#2A2F3A',
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
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
	},
	Drink: {
		screen: Drink,
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
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
	},

	Login: {
		screen: Login,
		navigationOptions: {
			title: 'Login',

			header: ({navigation}) => (
				<View
					style={{
						backgroundColor: 	'#2A2F3A',
						height: 			40,
						//TODO: to be removed this whole thing
						flex: 				0.08,
						justifyContent: 	'center',
					}}
				>
				<BackButton
					navigation={navigation}
				/>
				</View>
			)
		}
	},

},{
	mode: 'modal',
	initialRouteName:'MainCardNavigator',
	navigationOptions: {
		header: null
	}
}
);
