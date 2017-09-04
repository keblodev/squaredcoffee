import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';

import Button from 'react-native-button';

import {
    Card,
    CardImage,
    CardTitle,
    CardContent,
    CardAction
} from 'react-native-card-view';

import { ADDING_CARD, REMOVING_CARD, MAKING_ORDER } from '../../../statics/actions/user';
import styles from '../../../statics/styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppActions from '../../../actions';

import PaymentMethodsView from '../../shared/paymentMethodsView';

import CheckoutWebView from '../../shared/checkoutWebView';

class PaymentMethods extends Component {

    componentWillMount = () => {}

    componentWillUpdate = () => {
        // this.props.actions.getUserCards()
    }

    addCard = (isUserAddingCard, hasCards) => {
        if (isUserAddingCard) {
            this.props.actions.saveCard();
        } else {
            this.props.actions.addCard();
            if (!hasCards) {
                this.props.actions.saveCard();
            }
        }
    }

    render = () => {
        const {cards, persistPaymentMethod, paymentInstrument, userAction } = this.props.user;
        const {navigation} = this.props;
        const selectedCardId = paymentInstrument && paymentInstrument.card && paymentInstrument.card.id;

        const isUserAddingCard = userAction === ADDING_CARD;
        const hasCards = cards.length > 0;

        isAbleToAddCard = true;
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
                <CheckoutWebView
                        navigation={navigation}
                />
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
