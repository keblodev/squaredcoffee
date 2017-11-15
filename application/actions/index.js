import appActions from '../statics/actions';

import api from         './api';
import user from        './user';
import pushNotifications from './pushNotifications';
import geo from         './geo';
import sync from        './sync';
import shop from        './shop';
import cart from        './cart';

const appTestAction = val => ({ type: appActions.APP_TEST_ACTION, val });
const appTestActionDva = val => ({ type: appActions.APP_TEST_ACTION_DVA, val });

const postCheckoutMsgIn = message => ({ type: appActions.WEBVIEW_CHEKOUT_MESSAGE_IN, message });
const postCheckoutMsgOut = message => ({ type: appActions.WEBVIEW_CHEKOUT_MESSAGE_OUT, message });

const cardNonceReceived = nonce => dispatch =>
        //nonce received checkout webview messages que
        //must be cleared
        dispatch({ type: appActions.WEBVIEW_CHEKOUT_CLEAN_QUE})
        &&
        dispatch({ type: appActions.RECEIVED_USER_CARD_NONCE, nonce });

//PAYMENTS
const createNewPayment = payment => ({ type: appActions.PAYMENT_CREATE_NEW, payment })
const updatePayment = paymentUpdated => ({type: appActions.PAYMENT_UPDATE, paymentUpdated});
const resetPaymentInstrument = () => ({type: appActions.RESET_PAYMENT_INSTRUMENT});

export default {
	appTestAction,
	appTestActionDva,
	postCheckoutMsgIn,
    postCheckoutMsgOut,
	cardNonceReceived,
	createNewPayment,
    updatePayment,
    resetPaymentInstrument,
	...api,
	...user,
	...pushNotifications,
    ...geo,
    ...sync,
    ...shop,
    ...cart,
};
