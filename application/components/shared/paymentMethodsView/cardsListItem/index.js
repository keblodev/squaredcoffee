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

export default ({card_brand, last_4}) => (
	<Button>
		<Card>
			<View>
				<CardContent>
					<Text>
						XXXX XXXX XXXX {last_4} {card_brand}
					</Text>
				</CardContent>
			</View>
		</Card>
	</Button>
)