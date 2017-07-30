import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import Button from 'react-native-button'

import About from '../about';
import Drinks from '../drinks';

export default class Home extends Component {

	static navigationOptions = {
		title: 'Welcome',
	};

	render = () => {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Button
					style={styles.buttonStyle}
					onPress={() =>
						navigate('About', { name: 'Jane' })
					}
				>
					About
				</Button>
				<Button
					style={styles.buttonStyle}
					onPress={() =>
						navigate('Drinks', { name: 'Jane' })
					}
				>
					Drinks
				</Button>
				<Button
					disabled={true}
					style={styles.buttonDisabledStyle}
					onPress={() =>
						navigate('Drinks', { name: 'Jane' })
					}
				>
					Foods
				</Button>
				<Button
					style={styles.buttonStyle}
					onPress={() =>
						navigate('Checkout', { name: 'Jane' })
					}
				>
					Checkout
				</Button>
			</View>
		);
	}
};

const buttonStyle = {
		padding:20,
		margin: 10,
		height:65,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: 'white',
		fontSize: 20,
		color: 'grey',
    };

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
    buttonStyle,
    buttonDisabledStyle: {
		...buttonStyle,
        backgroundColor: '#DDDDDD',
        borderWidth: 0,
    },
    buttonDisabledTextStyle: {
        color: '#BCBCBC',
    },
});
