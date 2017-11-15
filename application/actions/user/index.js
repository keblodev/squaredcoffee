import appActions from '../../statics/actions';

const persistPaymentMethod = bool => ({ type: appActions.PERSIST_PAYMENT_METHOD, bool});

const addCard = _ => ({ type: appActions.USER_CARD_NEW, userAction: appActions.ADDING_CARD});
const saveCard = _ => ({ type: appActions.USER_CARD_SAVE });
const selectCard = cardId => ({ type: appActions.USER_CARD_SELECT,  cardId});

const saveNonce = () => ({ type: appActions.USER_NONCE_SAVE });
const setOneTimePayment = () => ({type: appActions.USER_NONCE_FORM, userAction: appActions.SETTING_ONE_TIME_PAYMENT});
const closeSetOneTimePayment = () => ({type: appActions.USER_NONCE_FORM_CLOSE});

const removeCard    = (cardId, cardRemoteId) => ({ type: appActions.USER_CARD_REMOVE, userAction: appActions.REMOVING_CARD, cardId, cardRemoteId});
const placeOrder    = (cart, shop)     => ({type: appActions.PLACE_ORDER, userAction: appActions.MAKING_ORDER, cart, shop});
const selectOrder   = id   => ({type: appActions.SELECT_ORDER, id});
const removeOrder   = id   => ({type: appActions.REMOVE_ORDER, id});
const dropCart      = ()        => ({type: appActions.DROP_CART});

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
    placeOrder,
    selectOrder,
    removeOrder,
};