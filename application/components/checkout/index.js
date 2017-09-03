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

import PaymentMethodsView from '../shared/paymentMethodsView';
import CheckoutSummary from './checkoutSummary';
import CartAction from './cartAction';

class Checkout extends Component {

	placeOrder = () => {
		this.props.actions.placeOrder();
	}

	render = () => {
		const { navigate } = this.props.navigation;
		const {cart, user} = this.props;

		return (
			<View
				style={{
					...styles.container,
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
							<PaymentMethodsView
								navigate={navigate}
							/> : null
						}
					</View>
				</ScrollView>

				<View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 	0
                    }}
				>
					<CartAction
						disabled={!cart.ids.length}
						placeOrderCb={this.placeOrder.bind(this)}
					/>
				</View>
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
