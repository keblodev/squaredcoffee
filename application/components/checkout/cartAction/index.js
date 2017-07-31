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

export default ({placeOrderCb, disabled}) => {
	return (
		<Card>
			<View>
				<CardAction>
					<Button
						disabled={disabled}
						style={disabled ? styles.buttonDisabledStyle :styles.buttonStyle}
						onPress={placeOrderCb}
					>
						Place Order
					</Button>
				</CardAction>
			</View>
		</Card>
	);
}

