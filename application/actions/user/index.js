import * as types from '../../statics/actions';

import { USER_CARD_NEW, USER_CARD_SELECT, USER_CARD_SAVE, USER_CARD_REMOVE, ADDING_CARD, REMOVING_CARD, MAKING_ORDER } from '../../statics/actions/user';

const persistPaymentMethod = bool => ({ type: types.PERSIST_PAYMENT_METHOD, bool});

const addCard = _ => ({ type: USER_CARD_NEW, userAction: ADDING_CARD});
const saveCard = _ => ({ type: USER_CARD_SAVE });
const selectCard = cardId => ({ type: USER_CARD_SELECT,  cardId});

const removeCard = (cardId, cardRemoteId) => ({ type: USER_CARD_REMOVE, userAction: REMOVING_CARD, cardId, cardRemoteId});

const placeOrder = _ => ({type: types.PLACE_ORDER, userAction: MAKING_ORDER});

export default {
	persistPaymentMethod,
	addCard,
	saveCard,
	removeCard,
	selectCard,
	placeOrder
};