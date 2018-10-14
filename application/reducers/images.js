import appActions from '../statics/actions';

const initialState = {};

export default function images(state = initialState, action) {
	switch (action.type) {
        case appActions.GOT_SHOP_IMG_CONFIG:
			return {
                ...state,
                ...action.data
            };
		default:
			return state;
	}
}