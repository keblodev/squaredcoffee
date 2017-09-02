import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

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
import strings from '../../../statics/strings';

class CheckoutSummary extends Component {

	render() {
		const {cart} = this.props;

		return (
			<Card>
				{
					cart.ids.length > 0 ? (
						<View>
							<CardTitle>
								<Text style={{
                                    ...styles.title,
                                    fontSize: 20
                                }}>Your order:</Text>
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
					) :
					(
						<View>
							<CardContent>
								<Card>
									<CardContent>
										<Text style={{textAlign: 'center'}}>This cart is too empty</Text>
										<Text style={{textAlign: 'center'}}>Buy something dude</Text>
									</CardContent>
								</Card>
							</CardContent>
						</View>
					)
				}
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
