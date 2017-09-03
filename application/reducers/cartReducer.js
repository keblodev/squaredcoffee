import {
	CART_ADD,
	CART_REMOVE,
	NONE } from '../statics/actions';

import {
    NONCE_CHARGED,
    USER_CARD_CHARGED,
} from '../statics/actions/api';

const initialState = {
	byId: {},
	ids: []
};

import * as userTypes from '../statics/actions/user';

const byId = (state = initialState.byId, action) => {
	const update_item = state[action.item.id] || action.item;

	switch (action.type) {
		case CART_ADD:
			update_item.qty = (update_item.qty || 0) + 1;
			return {
				...state,
				[action.item.id] : {...update_item}
			};
		case CART_REMOVE:
			update_item.qty = (update_item.qty || 0) - 1;
			if (update_item.qty <= 0) {
				delete state[update_item.id];
				return {...state};
			} else {
				return {
					...state,
					[action.item.id] : {...update_item}
				};
            }
		default:
			return state;
	}
}

export default cart = (state = initialState, action) => {
	switch (action.type) {
        case userTypes.DROP_CART:
        case NONCE_CHARGED:
        case USER_CARD_CHARGED:
			//clearing the cart on success purchase
			return initialState;
		case CART_ADD:
		case CART_REMOVE:
			const byIdState = byId(state.byId, action);
			return {
				byId: 	byIdState,
				ids:	Object.keys(byIdState)
			}
		default:
			return state;
	}
}