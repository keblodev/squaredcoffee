
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

export default ({shop, shopId, shopImg, navigate}) => (
	<Button
		onPress={() =>
			navigate('Home', {
					title: 	shop.name,
					shopId: shopId
				})
		}
	>
		<Card>
			<Image
				style={{
					height: 	'100%',
					flex: 		1,
					position: 	'absolute',
					width: 		'100%',
				}}
				source={shopImg}
			/>
			<View
				style={styles.card}
			>
				<CardTitle>
					<View
						style={styles.titleView}
					>
						<Text style={styles.title}>{shop.name}</Text>
					</View>
				</CardTitle>
				<CardContent>
					<View
						style={styles.cardViewContent}
					>
						<Text
							style={styles.text}
						>{shop.desc}</Text>
					</View>
				</CardContent>
			</View>
		</Card>
	</Button>
);

const styles = {
	card: {
		backgroundColor: 'transparent',
	},
	cardViewContent: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		padding:			10,
	},
	text: {
		color: 		'white',
		textAlign: 	'center',
	},
	titleView: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		width:				'100%'
	},
	title: {
		color:		 		'white',
		fontSize:		 	40,
		textAlign:		 	'center',
	}
};