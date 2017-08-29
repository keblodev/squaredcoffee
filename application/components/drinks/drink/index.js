import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

import Button from 'react-native-button'

import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction
} from 'react-native-card-view';

import styles from '../../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppActions from '../../../actions';

class Drink extends Component {
	render = () => {
		const {item, disabled} = this.props.navigation.state.params;
		const {navigate} = this.props.navigation;
		return (
			<View
				style={{
					height: '100%'
				}}
			>
				<ScrollView>
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
									<Text style={itemStyles.title}>{item.title}</Text>
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
								</View>
								</CardTitle>
							</View>
						</Card>

						<Card
								styles={{
									card: {
										overflow: 'hidden'
									}
								}}
							>
								<View
									style={
										disabled ?
											{
												...styles.card,
												...styles.cardDisabled
											} : styles.card
									}
								>
									<CardTitle>
										<View
											style={styles.titleView}
										>
											<Text style={
												disabled ?
													{
														...styles.title,
														...styles.titleDisabled
													} : styles.title
												}>Some text here</Text>
										</View>
									</CardTitle>
									<CardContent>
										<Text>Some Coffe Facts</Text>
									</CardContent>
								</View>
								<CardAction >
									<Button
									style={itemStyles.buttonStyle}
									onPress={this.props.actions.cartAdd.bind(this, item)}
									>
										+ to Cart
									</Button>
								</CardAction>
						</Card>
				</ScrollView>
				<View
					style={{
						position: 'absolute',
						bottom: 0,
						right: 	0
					}}
				>
					<Card
						styles={{card: {
								backgroundColor: 'transparent'
							}
						}}
					>
						<View>
							<CardAction>
								<Button
									style={{
										...styles.buttonStyle,
										borderRadius: 22
									}}
									onPress={()=> {
										navigate('Checkout');
									}}
								>
									Checkout
								</Button>
							</CardAction>
						</View>
					</Card>
				</View>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		shopId:	state.shops.selected.shopId
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Drink)

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