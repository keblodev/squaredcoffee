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

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default ({itemId, storeItem, onRemoveCartItem, onAddCartItem}) =>
<View
    style={{
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 2,
        backgroundColor: 'white',
        width: '100%'
    }}
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
                    color: 'gray',
					width: '25%'
				}}
			>amount: {storeItem.qty}</Text>
			<Text
				style={{
					textAlign: 'center',
                    fontSize: 20,
					width: '60%'
				}}
			>{storeItem.title}</Text>
            <View
                style={{
                    position: 'absolute',
                    right: 0,
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <Button
                    onPress={onRemoveCartItem}
                >
                    <View
                        style={{
                            padding: 5
                        }}
                    ><AwesomeIcon name="minus" size={30} color="grey" /></View>
                </Button>
                <Button
                    onPress={onAddCartItem}
                >
                    <View
                        style={{
                            padding: 5
                        }}
                    ><AwesomeIcon name="plus" size={30} color="grey" /></View>
                </Button>
            </View>
		</View>
	</CardContent>
</View>
