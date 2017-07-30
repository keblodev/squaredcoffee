import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import CheckoutWebViewWrap from './checkoutWebViewWrap'

export default class CheckoutWebView extends Component {
	render() {
		return (
			<Card>
				<View
					style={{
						flex: 1,
						margin: 10,
						width: '100%',
					}}
				>
					<CheckoutWebViewWrap />
				</View>
			</Card>
		);
	}
}