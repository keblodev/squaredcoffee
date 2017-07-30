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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import CartListItem from './cartListItem';

import styles from '../../../statics/styles';

class CheckoutSummary extends Component {
	render() {
		const {cart} = this.props;
		return (
			<Card>
				<View>
				<CardTitle style={{cardTitle: {fontSize: 40}}}>
					<Text style={styles.title}>in cart:</Text>
					</CardTitle>
					<CardContent>
						<ScrollView>
							{ cart.ids.map(itemId => {
									const storeItem = cart.byId[itemId];
									return <CartListItem
										key={itemId}
										storeItem={storeItem}
										onAddCartItem={this.props.actions.cartAdd.bind(this, storeItem)}
										onRemoveCartItem={this.props.actions.cartRemove.bind(this, storeItem)}
									/>
								})
							}
						</ScrollView>
					</CardContent>
				</View>
			</Card>
		);
	}
};

const mapState = (state) => {
	return {
		cart: state.cart,
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(CheckoutSummary);
