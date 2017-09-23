import { LOADING_ACTIVE, LOADING_NOT_ACTIVE, FETCHING_ACTIVE, FETCHING_NOT_ACTIVE, NONE } from '../statics/actions';
import { LOAD, SAVE } from 'redux-storage';

const initialState = {
    fetching: NONE,
    loading: NONE,
};

export default function sync(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return initialState;
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
        case SAVE:
        default:
            return state;
    }
}