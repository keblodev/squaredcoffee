import {
	CREATED_USER,
	CREATED_USER_CARD,
	LOGOUT_USER,
	PURCHASE_SUCCESS,
	NONE } from '../statics/actions/api';

import {
	PERSIST_PAYMENT_METHOD,
	PAYMENT_CREATE_NEW,
	RECEIVED_USER_CARD_NONCE,
	PAYMENT_UPDATE
} from '../statics/actions';

const initialState = {
	auth: 					null,
	nonce: 					null,
	cards: 					[],
	orders:					[], //todo
	payments:				[],
	paymentInstrument:		null, //  {nonce: String}, {card: Object}
	persistPaymentMethod: 	false
};

const updatePayment = (state = initialState.payments, action) => {
	state[action.updateId] = action.updateValue;
	return [...state];
}

export default user = (state = initialState, action) => {
	switch (action.type) {
		case PAYMENT_UPDATE:
			return {
				...state,
				payments: updatePayment(state.payments, action.paymentUpdated)
			}
		case PAYMENT_CREATE_NEW:
			return {
				...state,
				payments: [
					action.payment,
					...state.payments,
				]
			}
		case PERSIST_PAYMENT_METHOD:
			return {
				...state,
				persistPaymentMethod: action.bool
			}
		case LOGOUT_USER:
			return initialState;

		case CREATED_USER:
			return {
				...state,
				auth:	action.auth
			};
		case CREATED_USER_CARD:
			return {
				...state,
				paymentInstrument: {
					card: {
						id: state.cards.length,
						val: action.card
					}
				},
				cards:	[
					...state.cards,
					action.card
				]
			};
		case RECEIVED_USER_CARD_NONCE:
			return {
				...state,
				nonce:	action.nonce,
				paymentInstrument: {
					nonce: action.nonce
				},
			};
		default:
			return state;
	}
}