import { CART_ADD, CART_REMOVE, NONE } from '../statics/actions';

const initialState = {
	byId: {
		'someId': {
			id: 	'someId',
			title:  'someTitle',
			desc:	'someDesc',
			qty: 	1,
		}
	},
	ids: ['someId']
};

const byId = (state = initialState, action) => {
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