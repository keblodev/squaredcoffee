import {
	CREATED_USER,
	CREATED_USER_CARD,
	LOGOUT_USER,
	PURCHASE_SUCCESS,
} from '../statics/actions/api';

import {
	PERSIST_PAYMENT_METHOD,
	PAYMENT_CREATE_NEW,
	RECEIVED_USER_CARD_NONCE,
	PAYMENT_UPDATE,
	PLACE_ORDER,
	NONE
} from '../statics/actions';

import {
	ADDING_CARD,
	REMOVING_CARD,
	MAKING_ORDER,
	USER_CARD_NEW,
	USER_CARD_REMOVE,
	USER_CARD_SELECT
} from '../statics/actions/user';

const initialState = {
	auth: 					null,
	nonce: 					null,
	currency:				'USD',
	cards: 					[],
	orders:					[], //todo
	payments:				[],
	paymentInstrument:		null, //  {nonce: String}, {card: Object}
	persistPaymentMethod: 	false,
	userAction:				NONE
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
				payments: updatePayment(state.payments, action.paymentUpdated),
				userAction: NONE
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
				],
				//TODO: refak dis :/
				userAction: state.userAction === MAKING_ORDER ? state.userAction : NONE
			};
		case PLACE_ORDER:
			return {
				...state,
				userAction: action.userAction
			}
		case RECEIVED_USER_CARD_NONCE:
			return {
				...state,
				nonce:	action.nonce,
				paymentInstrument: {
					nonce: action.nonce
				},
			};
		case USER_CARD_SELECT:
			return {
				...state,
				paymentInstrument: {
					card: {
						id: action.cardId,
						val: state.cards[action.cardId]
					}
				}
			}
		case USER_CARD_REMOVE:
			const cardsNewState = state.cards.filter((item,idx) => idx !== action.cardId);
			const selectedCard = state.paymentInstrument.card
			const newSelectedCardId = 0;
			if (selectedCard) {
				if (selectedCard.id !== action.cardId) {
					newSelectedCardId = selectedCard.id
				}
			}
			return {
				...state,
				paymentInstrument: {
					card: {
						id: newSelectedCardId,
						val: cardsNewState[newSelectedCardId]
					}
				},
				cards:	cardsNewState,
			}
		case USER_CARD_NEW:
			return {
				...state,
				userAction: action.userAction
			}
		default:
			return state;
	}
}