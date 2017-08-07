import {PUSH_NOTIFY, SHOW_NOTIFY, HIDE_NOTIFY} from '../statics/actions'


const initialState = {
	message: '',
	active: false
}

export default notification = (state = initialState, action) => {
	switch(action.type) {
		case PUSH_NOTIFY:
			return {
				...state,
				message: action.notification
			};
		case SHOW_NOTIFY:
			return {
				...state,
				active: true
			};
		case HIDE_NOTIFY:
			return {
				...state,
				active: false
			};
		default:
			return state;
	}
}