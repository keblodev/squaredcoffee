import {PUSH_NOTIFY, SHOW_NOTIFY, HIDE_NOTIFY} from '../statics/actions'


const initialState = {
    msg:        '',
    popup:      false,
    error:      false,
    active:     false
}

export default notification = (state = initialState, action) => {
	switch(action.type) {
		case PUSH_NOTIFY:
			return {
                ...state,
				msg:    action.msg
			};
        case SHOW_NOTIFY:
			return {
                ...state,
                msg:        action.msg,
                popup:      !!action.popup,
                error:      !!action.error,
				active:     true,
			};
		case HIDE_NOTIFY:
			return {
                ...initialState,
                msg:    state.msg,
                error:  state.error
			};
		default:
			return state;
	}
}