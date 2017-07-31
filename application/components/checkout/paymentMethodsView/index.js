import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, WebView, ScrollView } from 'react-native';

import CheckBox from 'react-native-check-box';

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

import CardsListItem from './cardsListItem';
import CheckoutWebView from './checkoutWebView';

import styles from '../../../statics/styles';
import strings from '../../../statics/strings';

class PaymentMethodsView extends Component {

	onCardSelected(card) {
		this.props.actions.setPayementMethod({
			type: strings.PAYMENT_METHOD_CARD,
			instrument: {
				card: card.id
			}
		})
	}

	onSaveCardToggle(checked) {
		this.props.actions.persistPaymentMethod(!checked);
	}

	render() {
		const {cards, persistPaymentMethod} = this.props;
		let paymentMethodView;
		if (cards.length) {
			paymentMethodView = (
				<View>
					{
						cards.map((card, idx) => {
							return <CardsListItem
								key={idx}
								{...card}
								onCardsSelected={this.onCardSelected.bind(this, card)}
							/>
						})
					}
					<Card>
						<CardContent>
							<Button
								disabled={true}
								style={styles.buttonDisabledStyle}
							>
								+ add new card
							</Button>
						</CardContent>
					</Card>
				</View>
			)
		} else {
			const isAuthorized = this.props.auth;
			const SaveCardView = ({style}) => isAuthorized ?
								<CheckBox
									style={style}
									onClick={this.onSaveCardToggle.bind(this, persistPaymentMethod)}
									isChecked={persistPaymentMethod}
									disabled={!isAuthorized}
									leftText="Save card?"
								/> :
								<View
									style={style}
								>
									<Text
										style={{
											textAlign: 'center'
										}}
									>
										(i) login to save a card
									</Text>
									<Button
										style={styles.buttonStyle}
										onPress={this.props.actions.createUser.bind(this, {some: 'config'})}
									>
										login
									</Button>
								</View>;
			paymentMethodView = (
				<View>
					<Card>
						<View
							style={{
								width: '100%'
							}}
						>
							<SaveCardView
								style={{
									flex: 1,
									padding: 10,
									width: '100%'
								}}
							/>
						</View>
					</Card>
					<View
						style={{height: 300}}
					>
						<CheckoutWebView />
					</View>
				</View>
			);
		}

		return (
			<View>
				<ScrollView>
					{paymentMethodView}
				</ScrollView>
			</View>
		);
	}
};

const mapState = (state) => {
	return {
		auth:					state.user.auth,
		cards: 					state.user.cards,
		persistPaymentMethod: 	state.user.persistPaymentMethod
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(PaymentMethodsView);
