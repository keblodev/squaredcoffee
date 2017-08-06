import {
	PAYMENT_SUCCESS,
	PAYMENT_FAILED,
	NONE } from '../statics/actions';

const initialState = {
	message: null
};

export default modal = (state = initialState, action) => {
	switch (action.type) {
		case PAYMENT_SUCCESS:
			return {
				message: action.success
			};
		case PAYMENT_FAILED:
			return initialState
		default:
			return state;
	}
};