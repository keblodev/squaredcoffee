

import appTypes from '../../statics/actions';

import {
    USER_CREATED,
    USER_CARD_CREATED,
    LOGOUT_USER,
    NONCE_CHARGED,
    USER_CARD_CHARGED,
    CHARGE_NONCE_ERROR,
    CHARGE_USER_CARD_ERROR,
} from '../../statics/actions/api';

import actions from '../../actions';

const processReceivedNonce = () => {
    const {state, dispatch} = stateAndDispatch;
    const {persistPaymentMethod, userAction, nonce, paymentInstrument, auth} = state.user;

    if (userAction === userTypes.ADDING_CARD || (persistPaymentMethod && userAction === userTypes.SETTING_ONE_TIME_PAYMENT)) {
        saveCard({nonce, auth, dispatch});
    } else if (!persistPaymentMethod && userAction === userTypes.SETTING_ONE_TIME_PAYMENT) {
        dispatch(actions.closeSetOneTimePayment());
    } else if (userAction === userTypes.MAKING_ORDER) {
        dispatch(actions.createNewPayment({
            //refact this to be a different logic on selecting the payement mthd
            paymentMethod: paymentInstrument.card ? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
            state: PAYMENT_PENDING
        }));
    }
};

const processPayment = () => {
    const {state, dispatch} = stateAndDispatch;
    const {payments} = state.user;
    const {nonce} = state.user
    const lastPayment = __getPendingPayment(payments);
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
    //nonce only one time thing always
    dispatch(actions.resetPaymentInstrument());
}

__getPendingPayment = function(payments) {
    //currently just grabbing the last one
    //not smart -> I know :\
    //TODO
    return payments.length && payments[payments.length-1];
}

const processCreatedCard = () => {
	const {state, dispatch} = stateAndDispatch;
	const {payments, paymentInstrument, auth, userAction} = state.user;
	const {card} = paymentInstrument
	const lastPayment = __getPendingPayment(payments);

	if (userAction === userTypes.MAKING_ORDER) {
		switch(lastPayment.state) {
			case appTypes.PAYMENT_PENDING:
				chargeCard({card: card.val, auth, dispatch})
				break;
			case appTypes.PAYMENT_SUCCESS:
				debugger;
				break;
			case appTypes.PAYMENT_FAILED:
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
    const {paymentInstrument} = state.user;
    //we always need to request new nonce
    //unless we have saved card
    if (paymentInstrument) {
        dispatch(actions.createNewPayment({
            //refact this to be a different logic on selecting the payement mthd
            paymentMethod: paymentInstrument.card ? PAYMENT_BY_CARD : PAYMENT_BY_NONCE,
            state: PAYMENT_PENDING
        }));
    }
}

const processPurchaseFailure = (error) => {
    const {state, dispatch} = stateAndDispatch;

    console.log('[processPurchaseFailure] FAILURE');
    const {payments} = state.user;

    const lastPayment = __getPendingPayment(payments);;
    if (lastPayment) {
        lastPayment.state       = PAYMENT_FAILED
        const updatePayment = {
            updateId:       lastPayment.id,
            updateValue:    lastPayment
        }
        dispatch(actions.updatePayment(updatePayment));
    }
    if (!state.user.auth) {
        console.log("[processPurchaseSuccess] Resetting payment cuz you're no logged in bro");
        dispatch(actions.resetPaymentInstrument())
    }
}

const processPurchaseSuccess = (data) => {
    const {state, dispatch} = stateAndDispatch;
    const {transaction} = data;

    console.log('[processPurchaseSuccess] SUCCESS');
    const {payments} = state.user;
    //todo: refak or rethink or explain
    const lastPayment = __getPendingPayment(payments);
    if (lastPayment) {
        lastPayment.transaction = transaction
        lastPayment.state       = PAYMENT_SUCCESS
        const updatePayment = {
            updateId:       lastPayment.id,
            updateValue:    lastPayment
        }
        dispatch(actions.updatePayment(updatePayment));
    }
    if (!state.user.auth) {
        console.log("[processPurchaseSuccess] Resetting payment cuz you're no logged in bro");
        dispatch(actions.resetPaymentInstrument());
    }
};

const processWebViewMsgOut = () => {
    const   {state, dispatch} = stateAndDispatch;
    const   checkoutWebViewOutput = state.webviews.checkout.output,
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
            case appTypes.USER_NONCE_SAVE:
            case appTypes.USER_CARD_SAVE:
                getNonce();
                break;
            case appTypes.PLACE_ORDER:
                const {auth}  = state.user;
                const {cart, shop} = action;

                const order = cart.ids.map(id => cart.byUuid[id]);
                dispatch(actions.placeNewOrder({
                    auth,
                    order,
                    shopId:         shop.remoteId,
                    isDriveThrough: cart.isDriveThrough,
                }))
                break;
            case appTypes.WEBVIEW_CHEKOUT_MESSAGE_OUT:
                processWebViewMsgOut();
                break;
            case appTypes.USER_CARD_CREATED:
                processCreatedCard();
                break;
            case appTypes.RECEIVED_USER_CARD_NONCE:
                processReceivedNonce();
                break;
            case appTypes.PAYMENT_CREATE_NEW:
                processPayment();
                break;
            case appTypes.CHARGE_NONCE_ERROR:
            case appTypes.CHARGE_USER_CARD_ERROR:
                processPurchaseFailure(action.error)
                break;
            case appTypes.NONCE_CHARGED:
            case appTypes.USER_CARD_CHARGED:
                processPurchaseSuccess(action.success && action.success.data);
                break;
       }
    });

    return next(action);
}