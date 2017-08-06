import * as types from '../../statics/actions';

const persistPaymentMethod = bool => ({ type: types.PERSIST_PAYMENT_METHOD, bool});

export default {
	persistPaymentMethod
};