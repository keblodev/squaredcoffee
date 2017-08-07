
import {
	WEBVIEW_CHEKOUT_MESSAGE_IN,
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
	CREATED_USER,
	CREATED_USER_CARD,
	LOGOUT_USER,
	PURCHASE_SUCCESS,
	PURCHASE_ERROR
} from '../../statics/actions/api';

import actions from '../../actions';

const processReceivedNonce = () => {
	const {state, dispatch} = stateAndDispatch;
	const {cart} = state.cart;
	const {persistPaymentMethod} = state.user;

	dispatch(actions.createNewPayment({
		//refact this to be a different logic on selecting the payement mthd
		paymentMethod: persistPaymentMethod? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
		cart,
		state: PAYMENT_PENDING
	}));
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
	const {payments, paymentInstrument, auth} = state.user;
	const {card} = paymentInstrument
	const lastPayment = payments[0];

	switch(lastPayment.state) {
		case PAYMENT_PENDING:
			chargeCard({card: card.val, auth, dispatch})
			break;
		case PAYMENT_SUCCESS:
			//todo
			break;
		case PAYMENT_FAILED:
			//todo
			break;
	}
};

const processOrder = () => {
	const {state, dispatch} = stateAndDispatch;
	const {paymentInstrument, persistPaymentMethod} = state.user;
	//we always need to request new nonce
	//unless we have saved card
	if (paymentInstrument && paymentInstrument.card) {
		const {cart} = state.cart;
		dispatch(actions.createNewPayment({
			//refact this to be a different logic on selecting the payement mthd
			paymentMethod: persistPaymentMethod? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
			cart,
			state: PAYMENT_PENDING
		}));
	} else {
		dispatch(actions.postCheckoutMsgIn({
			message: 'GET_NONCE'
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
};

const processWebViewMsgIn = () => {
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
			case PLACE_ORDER:
				processOrder();
				break;
			case WEBVIEW_CHEKOUT_MESSAGE_OUT:
				processWebViewMsgIn();
				break;
			case CREATED_USER_CARD:
				processCreatedCard();
				break;
			case RECEIVED_USER_CARD_NONCE:
				processReceivedNonce();
				break;
			case PAYMENT_CREATE_NEW:
				processPayment();
				break;
			case PURCHASE_SUCCESS:
				processPurchaseSuccess();
				break;
		}
	});

	return next(action);
}