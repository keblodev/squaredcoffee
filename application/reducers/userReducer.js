import * as apiTypes from '../statics/actions/api';

import {
    PERSIST_PAYMENT_METHOD,
    PAYMENT_CREATE_NEW,
    RECEIVED_USER_CARD_NONCE,
    PAYMENT_UPDATE,
    PAYMENT_SUCCESS,
    PAYMENT_PENDING,
    PLACE_ORDER,
    REMOVE_ORDER,
    RESET_PAYMENT_INSTRUMENT,
    NONE
} from '../statics/actions';

import * as userTypes from '../statics/actions/user';

const initialState = {
    auth:                   null,
    nonce:                  null,
    currency:               'USD',
    cards:                  [],
    orders:                 [], //todo
    payments:               [],
    paymentInstrument:      null, //  {nonce: String}, {card: Object}
    billing:                null,
    persistPaymentMethod:   false,
    userAction:             NONE
};

const updatePayment = (state = initialState.payments, action) => {
    const newPayments = state.map((payment, idx)=> {
        if (payment.id === action.updateId) {
            payment = action.updateValue
        }
        return payment;
    })
	return newPayments;
}

const updateOrders = (state = initialState.orders, action) => {
    const lastOrder         = state[state.length-1];
    lastOrder.state         = action.updateValue.state;
    lastOrder.transaction   = action.updateValue.transaction;
	state[lastOrder.id]     = lastOrder;
	return [...state];
}

const maxTransactionsStoreForAuth       = 20;
const maxTransactionsStoreForNonAuth    = 3;

export default user = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_UPDATE:
            return {
                ...state,
                payments:   updatePayment(state.payments, action.paymentUpdated),
                userAction: NONE,
                orders:     updateOrders(state.orders, action.paymentUpdated)
            }
        case PAYMENT_CREATE_NEW:
            if ((!state.auth && state.payments.length >= maxTransactionsStoreForNonAuth)
                || (state.auth && state.payments.length >= maxTransactionsStoreForAuth)
            ) {
                state.payments.shift()
            }

            const lastOrder = state.orders.length ? state.orders[state.orders.length-1] : null;
            const newPayment = {
                ...action.payment,
                id:      state.payments.length-1,
                orderId: lastOrder.id
            };

            return {
                ...state,
                payments: [
                    ...state.payments,
                    newPayment,
                ]
            };
        case PLACE_ORDER:
            if ((!state.auth && state.orders.length >= maxTransactionsStoreForNonAuth)
                || (state.auth && state.orders.length >= maxTransactionsStoreForAuth)
            ) {
                state.orders.shift()
            }

            const newOrder = {
                ...action.order,
                id:         state.orders.length,
                state:      PAYMENT_PENDING,
                timestamp:  new Date()
            };

            var newOrders = [
                ...state.orders,
                newOrder
            ];

            return {
                ...state,
                userAction: action.userAction,
                orders: newOrders
            };
        case REMOVE_ORDER:
            var newOrders = state.orders.filter((order, idx) => order.id !== action.orderId);
            return {
                ...state,
                orders: newOrders
            };
        case PERSIST_PAYMENT_METHOD:
            return {
                ...state,
                persistPaymentMethod: action.bool
            };
        case apiTypes.LOGOUT_USER:
            return initialState;

        case apiTypes.GOT_USER_ACCOUNT_INFO:
            return {
                ...state,
                ...action.accountInfo
            };

        case apiTypes.CREATE_REMOTE_USER:
            return {
                ...state,
                billing: action.remoteUserConfig.billing
            };
        case apiTypes.REMOTE_USER_CREATED:
            return {
                ...state,
                auth:	    action.remoteResponse.auth,
                billing:    action.remoteResponse.billing
            };
        case apiTypes.USER_LOGGEDIN:
        case apiTypes.USER_CREATED:
            return {
                ...state,
                auth:	action.auth
            };

        case apiTypes.GOT_USER_CARDS:
            return {
                ...state,
                cards:	action.cards || initialState.cards,
            }
        case apiTypes.USER_CARD_CREATED:
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
                userAction: state.userAction === userTypes.MAKING_ORDER ? state.userAction : NONE
            };
        case RECEIVED_USER_CARD_NONCE:
            return {
                ...state,
                nonce:	action.nonce,
                paymentInstrument: {
                    nonce: action.nonce
                }
            };
        case userTypes.USER_CARD_SELECT:
            return {
                ...state,
                paymentInstrument: {
                    card: {
                        id: action.cardId,
                        val: state.cards[action.cardId]
                    }
                }
            }
        case RESET_PAYMENT_INSTRUMENT:
            return {
                ...state,
                paymentInstrument: initialState.paymentInstrument
            }
        case userTypes.USER_CARD_REMOVE:
            const cardsNewState = state.cards.filter((item,idx) => idx !== action.cardId);
            const selectedCard = state.paymentInstrument && state.paymentInstrument.card;
            const newSelectedCardId = 0;
            if (selectedCard) {
                if (selectedCard.id !== action.cardId) {
                    newSelectedCardId = Math.min(cardsNewState.length - 1, selectedCard.id)
                }
            }
            const newPaymentInstrument = initialState.paymentInstrument;
            if (cardsNewState.length) {
                newPaymentInstrument = {
                    card: {
                        id: newSelectedCardId,
                        val: cardsNewState[newSelectedCardId]
                    }
                }
            }

            return {
                ...state,
                paymentInstrument: newPaymentInstrument,
            }
        case userTypes.USER_CARD_NEW:
            return {
                ...state,
                userAction: action.userAction
            }
        case userTypes.USER_NONCE_FORM:
            return {
                ...state,
                userAction: action.userAction
            }
        case userTypes.USER_NONCE_FORM_CLOSE:
            return {
                ...state,
                userAction: NONE
            }
        default:
            return state;
    }
}