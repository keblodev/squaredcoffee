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

import styles from '../../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import PaymentMethodsView from '../../shared/paymentMethodsView';

class PaymentMethods extends Component {

	placeOrder = () => {
		this.props.actions.placeOrder();
	}

	render = () => {
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
					<PaymentMethodsView />
				</ScrollView>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		user: state.user,
		cart: state.cart
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(PaymentMethods);
