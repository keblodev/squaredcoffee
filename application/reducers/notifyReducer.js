import appActions from '../statics/actions';

const initialState = {
    msg:        '',
    popup:      false,
    error:      false,
    active:     false
}

export default notification = (state = initialState, action) => {
    switch(action.type) {
        case appActions.APP_INIT:
            return initialState;
        case appActions.PUSH_NOTIFY:
            return {
                ...state,
                msg:    action.msg
            };
        case appActions.SHOW_NOTIFY:
            return {
                ...state,
                msg:        action.msg,
                popup:      !!action.popup,
                error:      !!action.error,
                active:     true,
            };
        case appActions.HIDE_NOTIFY:
            return {
                ...initialState,
                msg:    state.msg,
                error:  state.error
            };
        default:
            return state;
    }
}