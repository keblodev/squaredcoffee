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

import styles from '../../../statics/styles';

export default ({item, addItem,checkoutItem}) => {
	return (
		<View>
			<Card>
				<CardTitle style={{cardTitle: {fontSize: 40}}}>
				<Text style={styles.title}>{item.title}</Text>
				</CardTitle>
				<CardContent>
					<Text>{item.desc}</Text>
				</CardContent>
				<CardAction >
					<Button
					style={styles.buttonStyle}
					onPress={addItem}
					>
						+ to Cart
					</Button>
					<Button
					style={styles.buttonStyle}
					onPress={checkoutItem}
					>
						Checkout Now
					</Button>
				</CardAction>
			</Card>
		</View>
	);
}
