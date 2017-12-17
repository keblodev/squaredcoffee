import appActions from '../statics/actions';

const initialState = {
    fetching:   appActions.NONE,
    loading:    appActions.NONE,
};

export default function sync(state = initialState, action) {
    switch (action.type) {
        case appActions.APP_INIT:
            return initialState;
        case appActions.LOADING_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case appActions.LOADING_NOT_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case appActions.FETCHING_ACTIVE:
            return {
                ...state,
                fetching: action.msg
            };
        case appActions.FETCHING_NOT_ACTIVE:
            return {
                ...state,
                fetching:  action.msg
            };
        default:
            return state;
    }
}