import appActions from '../statics/actions';

const initialState = {};

export default function images(state = initialState, action) {
	switch (action.type) {
        case appActions.GOT_CONFIGS:
			return {
                ...state,
                ...action.data.assets_config
            };
		default:
			return state;
	}
}