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

import styles from '../../../statics/styles';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const cartIcon = (<AwesomeIcon name="shopping-cart" size={20} style={{textAlign: 'center',}}/>)

export default ({item, addItem, disabled, navigate, cartItem}) => {
	return (
		<View>
			<Button
				disabled={disabled}
				onPress={() => {
						navigate("Drink", {item, addItem, disabled: true, navigate});
					}
				}
			>
				<Card
					styles={{
						card: {
							overflow: 'hidden'
						}
					}}
				>
					<Image
						style={itemStyles.image}
						source={item.img}
					/>
					<View
						style={
							disabled ?
								{
									...itemStyles.card,
									...itemStyles.cardDisabled
								} : itemStyles.card
						}
					>
						<CardTitle>
							<Text style={{
                                ...itemStyles.title,
                                maxWidth: '90%'
                            }}>{item.title}</Text>
						</CardTitle>
						<CardTitle
							styles={{
								cardTitle: {
									position: 'absolute',
									right: 	0,
									top: 	0
								}
						}}>
						<View>
							<Text style={{
								...itemStyles.title,
							}}>{item.price}</Text>
							<Text style={{
								...itemStyles.title,
								fontSize: 	20,
								textAlign: 	'right'
							}}>{item.currency}</Text>
                            {
                                cartItem ?
                                <Text
                                    style={{
                                        ...itemStyles.title,
                                        textAlign: 'right',
                                        fontSize: 15,
                                    }}
                                >{cartIcon} {cartItem.qty}</Text>
                                : null
                            }
						</View>
						</CardTitle>
						<CardAction >
							<Button
							style={itemStyles.buttonStyle}
							onPress={addItem}
							>
								+ to Cart
							</Button>
						</CardAction>
					</View>
				</Card>
			</Button>
		</View>
	);
}

const itemStyles = {
	...styles,
	card: {
		backgroundColor: 'transparent',
		width: '100%'

	},
	cardViewContent: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		padding:			10,
	},
	image: {
		height: 	'100%',
		flex: 		1,
		position: 	'absolute',
		width: 		'100%',
	},
	text: {
		color: 				'white',
		textAlign: 			'left',
		textShadowColor: 	'rgba(0,0,0, .5)',
		textShadowRadius: 	2,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
	},
	titleView: {
		backgroundColor: 	'rgba(0,0,0, .6)',
		borderRadius:		2,
		width:				'100%'
	},
	title: {
		color:		 		'white',
		fontSize:		 	40,
		textAlign:		 	'left',
		textShadowColor: 	'rgba(0,0,0, .5)',
		textShadowRadius: 	2,
		textShadowOffset: 	{
				height: 1,
				width: 1,
			}
	},
	titleDisabled: {
		color: 	'rgba(255,255,255, .6)',
	},
	cardDisabled: {
		backgroundColor: 	'rgba(0,0,0, .6)',
	}
};