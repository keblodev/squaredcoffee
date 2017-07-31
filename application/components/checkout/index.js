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

import styles from '../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../actions';

import PaymentMethodsView from './paymentMethodsView';
import CheckoutSummary from './checkoutSummary';
import CartAction from './cartAction';
import ProgressOverlay from './progressOverlay';

class Checkout extends Component {

	static navigationOptions = {
		title: 'Checkout',
	};

	placeOrder = () => {
		this.props.actions.placeOrder();
	}

	render = () => {
		const {cart, user} = this.props;
		const lastPayment = user.payments.length && user.payments[0]

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center'
				}}
			>
				<ScrollView
					style={{
						flex: 1
					}}
				>
					<View>
						<CheckoutSummary />
					</View>
					<View>
						{
							cart.ids.length ?
							<PaymentMethodsView /> : null
						}
					</View>
				</ScrollView>
				<View
					style={{flex: 0.15}}
				>
					<CartAction
						disabled={!cart.ids.length}
						placeOrderCb={this.placeOrder.bind(this)}
					/>
				</View>
				{
					lastPayment && lastPayment.state === 'PAYMENT_PENDING' ?
					(<ProgressOverlay />) : null
				}
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		checkoutWebViewOutput: state.webviews.checkout.output,
		user: state.user,
		cart: state.cart
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Checkout);
