import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

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
import OneTimePaymentListItem from './oneTimePaymentListItem';

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

    componentWillMount() {
        const auth = this.props.auth;
        if (auth) {
            this.props.actions.getUserCards({auth});
        }
    }

    onOneTimeSelected() {
        //todo
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
                <OneTimePaymentListItem
                    isSelected={!!paymentInstrument && paymentInstrument.nonce}
                    onCardsSelected={this.onOneTimeSelected.bind(this)}
                />
            </View>
        )

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
