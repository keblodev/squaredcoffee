import { LOADING_ACTIVE, LOADING_NOT_ACTIVE, FETCHING_ACTIVE, FETCHING_NOT_ACTIVE, NONE } from '../statics/actions';

const initialState = {
    fetching: NONE,
    loading: NONE,
};

export default function sync(state = initialState, action) {
    switch (action.type) {
        case LOADING_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case LOADING_NOT_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case FETCHING_ACTIVE:
            return {
                ...state,
                fetching: action.msg
            };
        case FETCHING_NOT_ACTIVE:
            return {
                ...state,
                fetching:  action.msg
            };
        default:
            return state;
    }
}