import {
	WEBVIEW_CHEKOUT_MESSAGE_IN,
	WEBVIEW_CHEKOUT_MESSAGE_OUT,
	WEBVIEW_CHEKOUT_CLEAN_QUE,
	NONE } from '../statics/actions';

const initialState = {
	checkout: {
		input: [],
		output: []
	}
};

//messages comming IN of CheckoutWebView
const input = (state = initialState.checkout.input, action) => {
	switch (action.type) {
		case WEBVIEW_CHEKOUT_MESSAGE_IN:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				type: action.type,
				message: action.message
			}, ...state];
		default:
			return state;
	}
};

//messages comming OUT of CheckoutWebView
const output = (state = initialState.checkout.output, action) => {
	switch (action.type) {
		case WEBVIEW_CHEKOUT_MESSAGE_OUT:
			return [{
				id: (state.length === 0) ? 0 : state[0].id + 1,
				type: action.type,
				message: action.message
			}, ...state];
		default:
			return state;
	}
};

const checkout = (state = initialState.checkout, action) => {
	switch (action.type) {
		case WEBVIEW_CHEKOUT_MESSAGE_IN:
		case WEBVIEW_CHEKOUT_MESSAGE_OUT:
			return {
				input:		input(state.input, action),
				output: 	output(state.output, action)
			};
		default:
			return state;
	}
};

export default webviews = (state = initialState, action) => {
	switch (action.type) {
		case WEBVIEW_CHEKOUT_CLEAN_QUE:
			return initialState;
		case WEBVIEW_CHEKOUT_MESSAGE_IN:
		case WEBVIEW_CHEKOUT_MESSAGE_OUT:
			return {
				checkout: checkout(state.checkout, action)
			};
		default:
			return state;
	}
};