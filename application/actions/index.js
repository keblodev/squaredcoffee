import * as types from '../statics/actions';

const appTestAction = val => ({ type: types.APP_TEST_ACTION, val });
const appTestActionDva = val => ({ type: types.APP_TEST_ACTION_DVA, val });

const cartAdd = item => ({ type: types.CART_ADD, item });
const cartRemove = item => ({ type: types.CART_REMOVE, item });

const postCheckoutMsgIn = message => ({ type: types.WEBVIEW_CHEKOUT_MESSAGE_IN, message });
const postCheckoutMsgOut = message => ({ type: types.WEBVIEW_CHEKOUT_MESSAGE_OUT, message });

export default {
	appTestAction,
	appTestActionDva,
	cartAdd,
	cartRemove,
	postCheckoutMsgIn,
	postCheckoutMsgOut
};
