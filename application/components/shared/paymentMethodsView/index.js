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
import SaveCardOptionBox from './saveCardOptionBox';

import styles from '../../../statics/styles';
import strings from '../../../statics/strings';

import { ADDING_CARD, REMOVING_CARD, MAKING_ORDER } from '../../../statics/actions/user';

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

	handleAddSaveCard(isUserAddingCard) {
		if (isUserAddingCard) {
			this.props.actions.saveCard();
		} else {
			this.props.actions.addCard();
		}
	}

	render() {
		const {cards, persistPaymentMethod, paymentInstrument, userAction} = this.props;
		let paymentMethodView;

		let selectedCardId = paymentInstrument && paymentInstrument.card && paymentInstrument.card.id;

		let isUserAddingCard = userAction === ADDING_CARD;

		if (cards.length) {
			paymentMethodView = (
				<View>
					{
						cards.map((card, idx) => {
							return <CardsListItem
								key={idx}
								{...card}
								idx={idx}
								isSelected={idx===selectedCardId}
								onCardsSelected={this.onCardSelected.bind(this, card)}
							/>
						})
					}
					{
						isUserAddingCard ? (
							<View
								style={{height: 300}}
							>
								<CheckoutWebView />
							</View>
						) : null
					}
					<Card>
						<CardContent>
							<Button
								style={styles.buttonStyle}
								onPress={this.handleAddSaveCard.bind(this, isUserAddingCard)}
							>
								{isUserAddingCard ? 'save card' : '+ add new card'}
							</Button>
						</CardContent>
					</Card>
				</View>
			)
		} else {
            const isLoggedIn = this.props.auth && this.props.auth.token;
            const isRemoteAuthorized = this.props.auth && this.props.auth.remoteAuthorized;
            paymentMethodView = (
                <View>
                    <Card>
                        <View
                            style={{
                                width: '100%'
                            }}
                        >
                            <SaveCardOptionBox
                                style={{
                                    flex: 1,
                                    padding: 10,
                                    width: '100%'
                                }}
                                isLoggedIn={isLoggedIn}
                                isRemoteAuthorized={isRemoteAuthorized}
                                checkboxCb={this.onSaveCardToggle.bind(this, persistPaymentMethod)}
                                {...this.props}
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
		userAction:				state.user.userAction,
		paymentInstrument:		state.user.paymentInstrument,
		persistPaymentMethod: 	state.user.persistPaymentMethod
	};
};

const mapDispatch = dispatch => ({
	actions: bindActionCreators(AppActions, dispatch)
});

export default
		connect(mapState, mapDispatch)(PaymentMethodsView);
