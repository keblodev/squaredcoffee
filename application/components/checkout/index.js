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

import CheckoutWebView from './checkoutWebView';
import CheckoutSummary from './checkoutSummary';
import CartAction from './cartAction';

class Checkout extends Component {

	static navigationOptions = {
		title: 'Checkout',
	};

	checkoutNewMessage = null
	checkoutLastMessageId = null

	componentWillReceiveProps({checkoutOutput}) {
		if (checkoutOutput.length) {
			const msgObj = checkoutOutput[0];
			if (msgObj.id !== this.checkoutLastMessageId) {
				console.log(msgObj);
				this.checkoutNewMessage = msgObj;
				this.checkoutLastMessageId = msgObj.id;
			}
		}
	}

	postMessage = () => {
		this.props.actions.postCheckoutMsgIn({
			val: 'messsage in'
		});
	}

	render = () => {
		const {cart} = this.props;

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
					<View
						style={{height: 300}}
					>
						<CheckoutWebView />
					</View>
				</ScrollView>
				<View
					style={{flex: 0.15}}
				>
					<CartAction
						postMessageCb={this.postMessage.bind(this)}
					/>
				</View>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		checkoutOutput: state.webviews.checkout.output
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(Checkout);
