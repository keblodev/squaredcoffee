import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default ({testClick,testClickDva}) => {
	return (
		<View>
			<Card
			>
				<CardTitle style={{cardTitle: {fontSize: 40}}}>
				<Text style={styles.title}>Some Coffee Title</Text>
				</CardTitle>
				<CardContent>
					<Text>Some Coffee Content</Text>
				</CardContent>
				<CardAction >
					<Button
					style={styles.buttonStyle}
					onPress={testClick}
					>
						+ to Cart
					</Button>
					<Button
					style={styles.buttonStyle}
					onPress={testClickDva}
					>
						Checkout Now
					</Button>

				</CardAction>
			</Card>
		</View>
	);
}

const buttonStyle = {
		padding:10,
		margin: 10,
		height:45,
		overflow:'hidden',
		borderRadius:4,
		backgroundColor: '#86DB9A',
		fontSize: 20,
		color: 'white'
    };

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 60,
    marginBottom: 60
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  button: {
    marginRight: 10
  },
  card: {
    width: 300
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
