import * as types from '../../statics/actions';

import * as userTypes from '../../statics/actions/user';

const persistPaymentMethod = bool => ({ type: types.PERSIST_PAYMENT_METHOD, bool});

const addCard = _ => ({ type: userTypes.USER_CARD_NEW, userAction: userTypes.ADDING_CARD});
const saveCard = _ => ({ type: userTypes.USER_CARD_SAVE });
const selectCard = cardId => ({ type: userTypes.USER_CARD_SELECT,  cardId});

const saveNonce = () => ({ type: userTypes.USER_NONCE_SAVE });
const setOneTimePayment = () => ({type: userTypes.USER_NONCE_FORM, userAction: userTypes.SETTING_ONE_TIME_PAYMENT});
const closeSetOneTimePayment = () => ({type: userTypes.USER_NONCE_FORM_CLOSE});

const removeCard = (cardId, cardRemoteId) => ({ type: userTypes.USER_CARD_REMOVE, userAction: userTypes.REMOVING_CARD, cardId, cardRemoteId});
const placeOrder = _ => ({type: types.PLACE_ORDER, userAction: userTypes.MAKING_ORDER});

const dropCart = () => ({type: userTypes.DROP_CART});

export default {
    persistPaymentMethod,
    setOneTimePayment,
    closeSetOneTimePayment,
    addCard,
    saveNonce,
    saveCard,
    dropCart,
    removeCard,
    selectCard,
    placeOrder
};