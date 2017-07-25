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

export default ({postMessageCb}) =>
	<Card>
		<View>
			<CardAction>
				<Button
					style={styles.buttonStyle}
					onPress={postMessageCb}
				>
					Place the order
				</Button>
			</CardAction>
		</View>
	</Card>
