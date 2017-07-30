import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../../statics/styles';

export default ({itemId, storeItem, onRemoveCartItem, onAddCartItem}) =>
	<Card
	key={itemId}
>
	<CardContent>
		<View
			style={{
				alignItems: 'center',
				flex: 1,
				flexDirection: 'row'
			}}
		>
			<Text
				style={{
					width: '15%'
				}}
			>Qty: {storeItem.qty}</Text>
			<Text
				style={{
					textAlign: 'center',
					width: '60%'
				}}
			>{storeItem.title}</Text>
			<Button
				style={styles.buttonStyle}
				onPress={onRemoveCartItem}
			>
				-
			</Button>
			<Button
				style={styles.buttonStyle}
				onPress={onAddCartItem}
			>
				+
			</Button>
		</View>
	</CardContent>
</Card>
