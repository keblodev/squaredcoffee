
import {
	WEBVIEW_CHEKOUT_MESSAGE_OUT,
	WEBVIEW_CHEKOUT_CLEAN_QUE,
	RECEIVED_USER_CARD_NONCE,
	PAYMENT_CREATE_NEW,
	PAYMENT_BY_CARD,
	PAYMENT_BY_NONCE,
	PAYMENT_PENDING,
	PAYMENT_SUCCESS,
	PAYMENT_FAILED,
	PLACE_ORDER,
	NONE } from '../../statics/actions';

import {
	USER_CREATED,
	USER_CARD_CREATED,
    LOGOUT_USER,
    NONCE_CHARGED,
    USER_CARD_CHARGED,
    CHARGE_NONCE_ERROR,
    CHARGE_USER_CARD_ERROR,
} from '../../statics/actions/api';

import * as userTypes from '../../statics/actions/user';

import actions from '../../actions';

const processReceivedNonce = () => {
	const {state, dispatch} = stateAndDispatch;
	const {cart} = state.cart;
	const {persistPaymentMethod, userAction, nonce, auth} = state.user;

    if (userAction === userTypes.ADDING_CARD || (persistPaymentMethod && userAction === userTypes.SETTING_ONE_TIME_PAYMENT)) {
        saveCard({nonce, auth, dispatch});
    } else if (!persistPaymentMethod && userAction === userTypes.SETTING_ONE_TIME_PAYMENT) {
        dispatch(actions.closeSetOneTimePayment());
    } else if (userAction === userTypes.MAKING_ORDER) {
		dispatch(actions.createNewPayment({
			//refact this to be a different logic on selecting the payement mthd
			paymentMethod: persistPaymentMethod ? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
			cart,
			state: PAYMENT_PENDING
		}));
	}
};

const processPayment = () => {
	const {state, dispatch} = stateAndDispatch;
	const {payments} = state.user;
	const {nonce} = state.user
	const lastPayment = payments[0];
	switch(lastPayment.paymentMethod) {
		case PAYMENT_BY_CARD:
			const {paymentInstrument, cards, auth} = state.user;
			//check if there's a selected card
			if (paymentInstrument.card) {
				chargeCard({card: paymentInstrument.card.val, auth, dispatch})
			} else {
				saveCard({nonce, auth, dispatch})
			}
			break;
		case PAYMENT_BY_NONCE:
			chargeNonce({nonce, dispatch});
			break;
	}

}

saveCard = ({nonce, auth, dispatch}) => {
	dispatch(actions.createUserCard({nonce, auth}));
}

chargeCard = ({card, auth, dispatch}) => {
	dispatch(actions.chargeUserCard({card, auth}));
}

chargeNonce = ({nonce, dispatch}) => {
	dispatch(actions.chargeNonce({nonce}));
}

const processCreatedCard = () => {
	const {state, dispatch} = stateAndDispatch;
	const {payments, paymentInstrument, auth, userAction} = state.user;
	const {card} = paymentInstrument
	const lastPayment = payments[0];

	if (userAction === userTypes.MAKING_ORDER) {
		switch(lastPayment.state) {
			case PAYMENT_PENDING:
				chargeCard({card: card.val, auth, dispatch})
				break;
			case PAYMENT_SUCCESS:
				debugger;
				break;
			case PAYMENT_FAILED:
				debugger;
				break;
		}
	}
};

const getNonce = () => {
	const {state, dispatch} = stateAndDispatch;

	dispatch(actions.postCheckoutMsgIn({
		message: 'GET_NONCE'
	}));
}

const processOrder = () => {
	const {state, dispatch} = stateAndDispatch;
	const {paymentInstrument, persistPaymentMethod} = state.user;
	//we always need to request new nonce
	//unless we have saved card
	if (paymentInstrument) {
		const {cart} = state.cart;
		dispatch(actions.createNewPayment({
			//refact this to be a different logic on selecting the payement mthd
			paymentMethod: persistPaymentMethod? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
			cart,
			state: PAYMENT_PENDING
		}));
	}
}

const processPurchaseSuccess = () => {
	const {state, dispatch} = stateAndDispatch;

	console.log('[processPurchaseSuccess] SUCCESS');
	const {payments} = state.user;
	//todo: refak or rethink or explain
	const updateIndex = 0;
	const lastPayment = payments.length && payments[updateIndex];
	if (lastPayment) {
		lastPayment.state = PAYMENT_SUCCESS
		const updatePayment = {
			updateId: 	updateIndex,
			updateValue: lastPayment
		}
		dispatch(actions.updatePayment(updatePayment));
    }
    if (!state.user.auth) {
        console.log("[processPurchaseSuccess] Reseting payment cuz you're no logged in bro");
        dispatch(actions.resetPaymentInstrument())
    }
};

const processWebViewMsgOut = () => {
	const 	{state, dispatch} = stateAndDispatch;
	const 	checkoutWebViewOutput = state.webviews.checkout.output,
			 {user} = state;

	if (checkoutWebViewOutput.length) {
		const msgObj = checkoutWebViewOutput[0];
		console.log(msgObj);
		//processing messages states here
		if (msgObj.message) {
			const {nonce} = msgObj.message;
			if (nonce) {
				dispatch(actions.cardNonceReceived(nonce));
			}
		}
	}
};

let stateAndDispatch = {};

export default store => next => action => {
	Promise.resolve().then(_=> {
		const state = store.getState();
		const dispatch = store.dispatch;
		stateAndDispatch = {state, dispatch};

		switch(action.type) {
            case userTypes.USER_NONCE_SAVE:
			case userTypes.USER_CARD_SAVE:
				getNonce();
				break;
			case PLACE_ORDER:
				processOrder();
				break;
			case WEBVIEW_CHEKOUT_MESSAGE_OUT:
				processWebViewMsgOut();
				break;
			case USER_CARD_CREATED:
				processCreatedCard();
				break;
			case RECEIVED_USER_CARD_NONCE:
				processReceivedNonce();
				break;
			case PAYMENT_CREATE_NEW:
				processPayment();
                break;
            case NONCE_CHARGED:
			case USER_CARD_CHARGED:
				processPurchaseSuccess();
				break;
		}
	});

	return next(action);
}