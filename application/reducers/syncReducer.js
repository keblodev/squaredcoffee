import appTypes from '../statics/actions';
import { LOAD, SAVE } from 'redux-storage';

const initialState = {
    fetching:   appTypes.NONE,
    loading:    appTypes.NONE,
};

export default function sync(state = initialState, action) {
    switch (action.type) {
        case LOAD:
            return initialState;
        case appTypes.LOADING_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case appTypes.LOADING_NOT_ACTIVE:
            return {
                ...state,
                loading: action.msg
            };
        case appTypes.FETCHING_ACTIVE:
            return {
                ...state,
                fetching: action.msg
            };
        case appTypes.FETCHING_NOT_ACTIVE:
            return {
                ...state,
                fetching:  action.msg
            };
        case SAVE:
        default:
            return state;
    }
}